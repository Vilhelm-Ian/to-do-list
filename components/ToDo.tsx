export default function ToDo (props) {
  function remove() {
    props.remove()
    console.log("hello")
  }
  return (
    <div className="todo"><span onClick={remove}>🗑️</span> {props.value}</div>
  )
}


