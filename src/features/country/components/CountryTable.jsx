// เจ้าของไฟล์: คนที่ 3
export default function CountryTable({ items = [] }) {
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
