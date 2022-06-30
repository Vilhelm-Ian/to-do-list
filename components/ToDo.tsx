export default function ToDo(props: any) {
  function remove() {
    props.remove();
    console.log("hello");
  }
  return (
    <div className="todo">
      <span onClick={remove}>🗑️</span> {props.value}
    </div>
  );
}
