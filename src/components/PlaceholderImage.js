import React from 'react'

export const PlaceholderImage = () => {
  return (
    <img
      className="rounded-lg bg-white"
      src={process.env.PUBLIC_URL + "/default.png"}
      alt=""
    />
  )
}
