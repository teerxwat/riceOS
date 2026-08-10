// เจ้าของไฟล์: คนที่ 1
export default function CustomerTable({ items = [] }) {
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
