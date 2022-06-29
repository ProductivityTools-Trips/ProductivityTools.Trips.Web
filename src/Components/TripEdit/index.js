
import { useParams  } from "react-router-dom";


function TripEdit(){
    let params=useParams();

    return(
        <div>
            <p>TripEdit</p>
            <p>{params.id}</p>
        </div>
    )
}

export default TripEdit