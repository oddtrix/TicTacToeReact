import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { GetPlayerHistory } from "../../redux/slices/profile";
import { IHistory } from "../../types/game.typing";

const Pagination = () => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.profile.Data);
    const history: IHistory = useAppSelector((state) => state.profile.History);

    const makeRequest = (page : number) => {
        dispatch(GetPlayerHistory({ userId, page }))
    }

    const renderButton = (pageNumber: number) => {
        const isActive = history.Page === pageNumber;
        const className = `flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${isActive ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white' : ''}`;
    
        return (
          <li key={pageNumber}>
            {pageNumber === history.Page ? (
              <span className={className}>{pageNumber}</span>
            ) : (
              <button onClick={() => makeRequest(pageNumber)} className={className}>
                {pageNumber}
              </button>
            )}
          </li>
        );
    };

    const renderMiddlePages = () => {
        const visiblePages = Math.min(3, history.TotalPages); // Ensure max 3 buttons for middle pages
        const startPage = Math.max(Math.min(history.Page - 1, history.TotalPages - visiblePages + 1), 2); // Clamp start page between 2 and TotalPages-visiblePages+1
        const endPage = Math.min((startPage + visiblePages - 1 ), history.TotalPages); // Clamp end page between startPage+visiblePages-1 and TotalPages

        return [...Array(endPage - startPage + 1)].map((_, index) => renderButton(startPage + index));
    };

    const renderLastPage = () => {
        if (history.Page !== history.TotalPages - 1 && history.Page < history.TotalPages - 1){
            return (
                <><li>...</li><li>{renderButton(history.TotalPages)}</li></>
            )
        }
    }
    return (
        <nav>
            <ul className="flex items-center -space-x-px h-8 text-sm">
                {history.TotalPages > 4 ? (
                    <>
                        <li>{renderButton(1)}</li>
                        {history.Page > 2 && <li>...</li>}
                        {renderMiddlePages()}
                        {renderLastPage()}
                    </>
                    ) : (
                    <>
                        {Array.from({ length: history.TotalPages }, (_, i) => i + 1).map(renderButton)}
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;