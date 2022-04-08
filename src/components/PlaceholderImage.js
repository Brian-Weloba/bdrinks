import React from 'react'

export const PlaceholderImage = () => {
  return (
    <img
      className="rounded-t-lg"
      src={process.env.PUBLIC_URL + "/default.png"}
      alt=""
    />
  )
}
