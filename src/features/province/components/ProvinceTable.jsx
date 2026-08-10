// เจ้าของไฟล์: คนที่ 2
export default function ProvinceTable({ items = [] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {items.map((it) => (
          <tr key={it.id}>
            <td>{it.id}</td>
            <td>{it.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
