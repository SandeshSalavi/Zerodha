import React from 'react';
import Hero from './Hero';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
import Universe from './Universe';

const ProductsPage = () => {
  return (
    <div className="products-page">
      <Hero />
      <LeftSection imageURL="media/images/kite.png" productName="Kite"
       productDescription="Our ultra-fast flagship platform with straming market data,advanced charts,an elegant UI,and more.Enjoy the kite experience seamlessly on your Android and iOS devices." 
       tryDemo="" 
       learnMore="" 
       googlePlay=""
       appStore="" />
      <RightSection 
      imageURL="media\images\console.png" productName="Console"
       productDescription="An easy grasp,collection of stock markets lessons with in-depth coverage and illustration.Content is borken into bite-size cards to help you learn on the go." 
       tryDemo="" 
       learnMore="" 
       googlePlay=""
       appStore=""/>

<LeftSection imageURL="media\images\coin.png" productName="Coin"
       productDescription="An easy grasp,collection of stock markets lessons with in-depth coverage and illustration.Content is borken into bite-size cards to help you learn on the go." 
       tryDemo="" 
       learnMore="" 
       googlePlay=""
       appStore="" />
       <RightSection 
      imageURL="media\images\kiteconnect.png" productName="kite connect API"
       productDescription="An easy grasp,collection of stock markets lessons with in-depth coverage and illustration.Content is borken into bite-size cards to help you learn on the go." 
       tryDemo="" 
       learnMore="" 
       googlePlay=""
       appStore=""/>

              <LeftSection imageURL="media\images\varsity.png" productName="Varsity mobile"
       productDescription="An easy grasp,collection of stock markets lessons with in-depth coverage and illustration.Content is borken into bite-size cards to help you learn on the go." 
       tryDemo="" 
       learnMore="" 
       googlePlay=""
       appStore="" />
      <Universe />
      
    </div>
  );
};

export default ProductsPage;
