import { useState, useCallback } from 'react';

interface UsePaginationProps {
  initialPage?: number;
  pageSize?: number;
  totalItems: number;
}

export const usePagination = ({
  initialPage = 1,
  pageSize = 10,
  totalItems,
}: UsePaginationProps) => {
  const [page, setPage] = useState(initialPage);
  const totalPages = Math.ceil(totalItems / pageSize);

  const goToPage = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setPage(newPage);
      }
    },
    [totalPages]
  );

  const nextPage = useCallback(() => {
    goToPage(page + 1);
  }, [page, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(page - 1);
  }, [page, goToPage]);

  return {
    page,
    setPage: goToPage,
    totalPages,
    nextPage,
    prevPage,
    startIndex: (page - 1) * pageSize,
    endIndex: page * pageSize,
  };
};
