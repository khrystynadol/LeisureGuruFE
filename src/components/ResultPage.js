import React from "react";
import {PlaceComponent} from "./PlaceComponent"

export const ResultPage = function(respData){
    console.log(respData);
    debugger;
    // const result = 
    //     respData && Array.isArray(respData) &&
    //     respData.map((infoIndex)=>{
    //         return(
    //         <PlaceComponent 
    //         name={infoIndex.name} 
    //         image={infoIndex.image} 
    //         description={infoIndex.description} 
    //         rate={infoIndex.rate} 
    //         country={infoIndex.country}
    //         city={infoIndex.city}
    //         authorized = {true}/>
    //     )})
    

    // const result = [
    //             {
    //                 name: 'abc',
    //                 image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Латинський_кафедральний_собор_%28Львів%29_16.jpg/270px-Латинський_кафедральний_собор_%28Львів%29_16.jpg',
    //                 description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborumnumquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiumoptio, eaque rerum! Provident similique accusantium nemo autem. Veritatisobcaecati tenetur iure eius earum ut molestias architecto voluptate aliquamnihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,quia.',
    //                 rate: 5,
    //                 country: 'Ukraine',
    //                 city: 'Lviv'
    //             }
    //         ];
    // respData = result;
    return(
    <div>
        <ul style = {{display:'block'}}>
            <li style = {{display:'inline-block'}}>

                {
                    // respData &&
                    // respData.map((infoIndex)=>(
                    //     <PlaceComponent 
                    //     name={infoIndex.name} 
                    //     image={infoIndex.image} 
                    //     description={infoIndex.description} 
                    //     rate={infoIndex.rate} 
                    //     country={infoIndex.country}
                    //     city={infoIndex.city}
                    //     authorized = {true}/>
                    // ))
                    //result[0]
                }
                
            </li>
        </ul>
    </div>
    );
}