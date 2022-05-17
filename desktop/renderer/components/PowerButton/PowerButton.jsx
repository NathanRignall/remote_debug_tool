const PowerButton = (props) => {

    return (

        <button className={(props.power ? "bg-red-600 " : "bg-green-600 ") + "text-white font-bold display-inline px-8 py-3 rounded-lg"}>

            {props.power ? "Power Off" : "Power On"}

        </button>

    )

}

export default PowerButton;