const getInitials = (fullname) =>
    fullname
      .replace(/\s+/, " ")
      .split(" ")
      .slice(0, 2)
      .map((v) => v && v[0].toUpperCase())
      .join("");


export {getInitials}      