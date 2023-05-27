'use client';
import Image from 'next/image'

export default function Home() {
  return (
    <div className="container">
      
      <div>
        <div className="col-md-6 m-auto pt-4">
          <img
            src="images\logoBookShop.png"
            alt="Imagen 2"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </div>
      <div className="m-auto p-0 m-0">
        <div className="p-0 m-0  ">
          <img
            src="images\HKLibrary.png"
            alt="Imagen 1"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </div>
    </div>
  );
}