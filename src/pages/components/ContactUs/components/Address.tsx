import locationImage from './../../../../assets/location.png'

const Address = () => {
  return (
    <div className="aj-address flex flex-col">
      <h2 className='text-[38px] leading-[45.6px] font-bold border border-[#121212] border-b-0 py-4 text-center'>Address</h2>
      <ul className='flex-grow flex flex-col justify-center items-center gap-6 border border-[#121212]'>
        <li className="flex items-center gap-2 leading-[19.2px]">opening hours: 8 to 11 p.m.</li>
        <li className="flex items-center gap-2 leading-[19.2px]"><img src={locationImage} />15/4 Khreshchatyk Street, Kyiv </li>
      </ul>
    </div>
  )
}

export default Address