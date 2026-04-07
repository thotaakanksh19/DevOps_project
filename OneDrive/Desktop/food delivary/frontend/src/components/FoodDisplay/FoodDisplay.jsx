import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({category}) => {


    const {foodList} = useContext(StoreContext)
  return (
    <div className='food-display' id='food-display'>
        <h2>top dishes near you</h2>
        <div className="food-display-list">
           {foodList.map((item, index)=>{
                const selectedCategory = String(category).trim().toLowerCase();
                const itemCategory = String(item.category || '').trim().toLowerCase();
                if (selectedCategory === 'all' || selectedCategory === itemCategory){
                  return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
                }
                return null;
           })}

        </div>
      
    </div>
  )
}

export default FoodDisplay
