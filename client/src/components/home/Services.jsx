import React from "react";
import Card from "./Card";

const Services = () => {
  const card = [
    {
      title: "Personal Info and IDs",
      content: "SafeGuard your personal and official documents",
      img: "https://imgs.search.brave.com/HdOjsDB6817sNbxeEqOxSj6Fi7aeeGdQjtpWJpv2-LQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cHJpbnRlcnBpeC5j/b20vaW1hZ2VzL2Fk/bWluL3BhZ2Vncm91/cGltYWdlcy9iaWcw/NC9kM2MxMzI4ZS1h/NWIzLTQwZjktYjhm/Yy02MTViNDBmY2E3/ODMud2VicA",
    },
    {
      title: "Shopping Info",
      content: "Secure your eCommerece and delivery platform data",
      img : "https://imgs.search.brave.com/-4csbw3MI-RPzKYbORp6LdCNJRJJ5h8eXJ1a_tooA8o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/Y3JlYXRlLnZpc3Rh/LmNvbS9hcGkvbWVk/aWEvc21hbGwvNjY0/MTIwMTMvc3RvY2st/cGhvdG8td2hpdGUt/c2hvcHBpbmctYmFn"
    },
    {
      title: "Social Media",
      content: "Centralize your social life Securely",
      img : "https://imgs.search.brave.com/bI4utvbrN2de9FumPtrRDVflJBEUEwt5TuiXArICXQg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xOTY4LzE5Njg4/NzIucG5nP3NlbXQ9/YWlzX2h5YnJpZA"
    },
    {
      title: "Bank details",
      content: "Organize your financial credentials smartly",
      img : "https://imgs.search.brave.com/AY1tLCXL0qHHKs7Bmg6Wmv73NYKRT1s1gDcd7xUIx_k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9vbmVt/b25leXdheS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjQv/MDkvd2hhdC1iYW5r/LWRldGFpbHMtZG8t/aS1naXZlLXRvLXJl/Y2VpdmUtbW9uZXku/cG5n"
    },
    {
      title: "Education details",
      content: "Manage online learning portals and certification sites",
      img : "https://imgs.search.brave.com/nLWTKQwLixu7wZB3qE6pDX1EbJink_r8Y05jH-4YLh4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzEyLzQxLzgy/LzM2MF9GXzExMjQx/ODI4MF9IMlA3MVdZ/ZzI4SlBxcWhOYUhJ/bWdGUldUaldnMmw0/OS5qcGc"
    },
    {
      title: "Bills and utilitly details",
      content: "Keep track of your digital billing accounts",
      img : "https://imgs.search.brave.com/hX01X6FqvXa5RTHUSdZ7G03rpkaCS2BNTypnUeQ0uN8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC8yNy8xMy9p/c29tZXRyaWMtb25s/aW5lLWJpbGwtcGF5/bWVudC1ob21lLXV0/aWxpdGllcy12ZWN0/b3ItNDU2ODI3MTMu/anBn"
    },
  ];
  return (
    <div id="services">
      <h1 className="md:text-4xl text-2xl font-bold text-center mb-20 mt-10">
        Services
      </h1>
      <div className=" md:px-10 grid md:grid-cols-3 place-items-center align-center gap-y-15">
        {card.map((c, idx) => (
          <Card key={idx} title={c.title} content={c.content} index={idx} img={c.img} />
        ))}
      </div>
    </div>
  );
};

export default Services;
