//พื้นฐาน hook useState useEffect




import React  from 'react'

const Sidebar = () => {
    // let fullname = 'Jhon'
    const [fullname, setFullname] = React.useState('Jhon')
    const [isShow, setIsShow] = React.useState(true)
    

    const changeName = () => {
        // fullname = 'Marry'
        setFullname('Marry')
        setIsShow(!isShow) //toggle สลับ
        
    }


    React.useEffect(() =>{
        console.log('sidebar useEffect')



    })
    React.useEffect(() =>{
        console.log('sidebar useEffect =>' + fullname)
    },[fullname])

  return (
    <div><h3>Sidebar</h3>
                {
                    isShow ? <p>Hello</p> : <p>error</p>
                }
    <p>Hi {fullname}</p>
    <button onClick={changeName}>Click</button>


    </div>
  )
}

export default Sidebar