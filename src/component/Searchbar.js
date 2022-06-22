export default function Searchbar() {
  const mystyle = {
    height: "20px",
    width: "90%",
    margin:"1% 5% 0% 5%",
  };
  return (
    <div >
        <input style={mystyle} type="text" placeholder="Search by name,email or role.."/>
    </div>
  );
}

