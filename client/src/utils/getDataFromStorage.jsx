const getData = ()=>{
    const existing = JSON.parse(localStorage.getItem("user-data")) || null
    if(existing)
        return existing
    else
        console.log("No Data in storage")
}
export default getData