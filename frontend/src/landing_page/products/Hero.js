import React from 'react';

function Hero() {
    return ( 
        <div className='container border-bottom mb-5'>
            <div className='row text-center mt-5 p-3'>
                <h1 >Techonology</h1>
                <h3 className='mt-3 text-muted fs-4'>Sleek,modern and intutive trading platforms</h3>
                <p className='mt-3'>check out our <a href='' style={{textDecoration:"none"}}>investment offerings<i class="fa-solid fa-arrow-right"></i></a> </p>
            </div>
        </div>
     );
}

export default Hero;
