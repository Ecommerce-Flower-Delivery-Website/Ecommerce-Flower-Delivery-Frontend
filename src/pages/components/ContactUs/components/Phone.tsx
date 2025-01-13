import PhoneImage from './../../../../assets/phone.png'

const Phone = () => {
  return (
    <div className="aj-phone flex flex-col">
      <h2 className='text-[38px] leading-[45.6px] font-bold border border-black border-r-0 py-4 text-center'>Phone</h2>
      <ul className='flex-grow flex flex-col justify-center items-center gap-6 border border-black border-t-0 border-r-0 leading-[19.2px]'>
        <li className="flex items-center gap-2 leading-[19.2px]"><img src={PhoneImage} alt="" />+380980099777</li>
        <li className="flex items-center gap-2 leading-[19.2px]"><img src={PhoneImage} />+380980099111</li>
      </ul>
    </div>
  )
}

export default Phone