/**
 * Table Component
 * Data table with hover effects and responsive design
 */
const Table = ({ children, className = '' }) => (
  <div className="w-full overflow-x-auto rounded-xl border border-white/10">
    <table className={`w-full ${className}`}>
      {children}
    </table>
  </div>
);

/**
 * Table Header
 */
Table.Header = ({ children, className = '' }) => (
  <thead className={`bg-base-tint border-b border-white/10 ${className}`}>
    {children}
  </thead>
);

/**
 * Table Body
 */
Table.Body = ({ children, className = '' }) => (
  <tbody className={className}>
    {children}
  </tbody>
);

/**
 * Table Row
 */
Table.Row = ({ children, className = '', onClick }) => (
  <tr 
    className={`
      border-b border-white/5 
      hover:bg-white/5 transition-colors
      ${onClick ? 'cursor-pointer' : ''}
      ${className}
    `}
    onClick={onClick}
  >
    {children}
  </tr>
);

/**
 * Table Header Cell
 */
Table.Th = ({ children, className = '' }) => (
  <th className={`px-6 py-4 text-left text-sm font-bold text-text-bright uppercase tracking-wider ${className}`}>
    {children}
  </th>
);

/**
 * Table Data Cell
 */
Table.Td = ({ children, className = '' }) => (
  <td className={`px-6 py-4 text-text-medium ${className}`}>
    {children}
  </td>
);

export default Table;
