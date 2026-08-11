// ตารางข้อมูลใช้ซ้ำได้ทุกหน้า — ส่ง columns (นิยามคอลัมน์) + rows (ข้อมูล) เข้ามา
// แทนที่จะเขียน <table> แยกทุกหน้า (แต่ละหน้าโครง table เหมือนกันหมด ต่างแค่ข้อมูล)
// caption ใส่ไว้เป็น sr-only ให้ screen reader รู้จุดประสงค์ตาราง (ไม่โชว์ตา)
function DataTable({ columns, rows, rowKey = 'id', caption }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-body">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b border-db-border">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-2 py-2 text-label font-semibold text-db-text-muted ${
                  col.align === 'right' ? 'text-right' : 'text-left'
                }`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row[rowKey]}
              className="border-b border-db-border last:border-0"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-2 py-2.5 text-db-text ${
                    col.align === 'right' ? 'text-right tabular-nums' : ''
                  }`}
                >
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
