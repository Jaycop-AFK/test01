import React from 'react'

import axios from 'axios'

const About = () => {
    const [version, setVersion] = React.useState('')

    
       const getData = async () => {
            const resp = await axios.get('https://api.codingthailand.com/api/version')
            //console.log(resp.data.data.version)
            setVersion(resp.data.data.version)
       }

    
    React.useEffect(() => {
      
    //    async function getData() {
    //         const resp = await axios.get('https://api.codingthailand.com/api/version')
    //         //console.log(resp.data.data.version)
    //         setVersion(resp.data.data.version)
    // }


        getData()
    
    },[])
    

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-12'>
                <h2>เกี่ยวกับ</h2>
                <p>
                    backend API version {version}

                </p>
                 </div>
        </div>

    </div>
  )
}

export default About