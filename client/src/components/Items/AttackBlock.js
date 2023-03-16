export default function AttackBlock(props) {
    return (
        <div className="transition duration-500 ease-in-out bg-cover bg-[url('https://media.istockphoto.com/id/1300397135/vector/violet-purple-and-navy-blue-defocused-blurred-motion-gradient-abstract-background.jpg?s=612x612&w=0&k=20&c=YH_QbC3h3uaxsr9X55MG4oeeySjmSXHL8yKTYVYfsSU=')] hover:scale-95 w-4/5 rounded-[25px] bg-[#3B3B3B] p-6 sm:p-12 mb-12">
            <div className="h-full w-full">
                <div >
                    <img className="w-1/6" alt="" src={`${props.icon}`}/>
                    <p className="text-white text-2xl sm:text-3xl pt-4 font-bold">{props.title}</p><br/>
                </div>
                <div className="text-white sm:text-xl">
                    <p>{props.desc}</p>
                </div>
            </div>
        </div>
    )
}