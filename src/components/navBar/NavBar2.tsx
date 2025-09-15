'use client';

 
import Image from 'next/image';
import { useRouter } from 'next/navigation';
 

const Navbar_Below = () => {
 const router=useRouter();

  return (
     <div className="flex gap-7 justify-end items-center">
                <div onClick={()=>router.push("/devices")} className="flex items-center gap-1 cursor-pointer text-gray-700">
                    <Image src="/overview/device.png" alt="device" width={20} height={20}>

                    </Image>
                    <span className='text-slate-600 text-base font-normal'>Devices</span>
                </div>

                <div onClick={()=>router.push("/smartdns")} className="flex items-center gap-1 cursor-pointer text-gray-700">
                    <Image src="/overview/dnsserver.png" alt="device" width={20} height={20}>

                    </Image>
                    <span className='text-slate-600 text-base font-normal'>Smart DNS</span>
                </div>

                <div onClick={()=>router.push("/vpnCrediental")} className="flex items-center gap-1 cursor-pointer text-gray-700">
                    {/* <Image src="/overview/vpncrediental.png" alt="device" width={20} height={20}>

                    </Image>
                    <span className='text-slate-600 text-base font-normal'>VPN Credential</span> */}
                </div>
            </div>
  );
};

export default Navbar_Below;
