import { Button } from "./ui/button";

type PageAndSize = { page: number, size: number };
interface PaginationProps {
  pagination: PageAndSize
  onPagination: (pagination: PageAndSize) => void
  paginatedMetadata: { count: number, hasNextPage: boolean }
}

const Pagination = ({ pagination, onPagination, paginatedMetadata }: PaginationProps) => {
  const { count, hasNextPage } = paginatedMetadata;
  const startOffset = pagination.page * pagination.size + 1;
  const endOffset = startOffset - 1 + pagination.size;
  const actualEndOffset = Math.min(endOffset, count);
  const label = `${startOffset} - ${actualEndOffset} of ${count}`;

  const handleNextPage = () => {
    onPagination({ ...pagination, page: pagination.page + 1 })
  }

  const handlePreviuosPage = () => {
    onPagination({ ...pagination, page: pagination.page - 1 })
  }

  const prevButton = (
    <Button
      variant="outline"
      size="sm"
      disabled={pagination.page < 1}
      onClick={handlePreviuosPage}
    >Previous</Button>
  )
  const nextButton = (
    <Button
      variant="outline"
      size="sm"
      disabled={!hasNextPage}
      onClick={handleNextPage}
    >Next</Button>
  )

  return (
    <div className="flex justify-between">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex gap-2">
        {prevButton}
        {nextButton}
      </div>
    </div>
  )
};

export default Pagination;
