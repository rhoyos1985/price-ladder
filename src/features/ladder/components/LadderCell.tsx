import React from 'react';

interface LadderCellProps {
  value: number | string;
  className?: string;
  onClick?: () => void;
}

const LadderCell: React.FC<LadderCellProps> = React.memo(({ value, className = '', onClick }) => {
  return <td className={className} onClick={onClick}>{value}</td>;
});

export default LadderCell;
