import React from 'react';

function Hero() {
    return ( 
        <section className='container-fluid' id='supportHero' >
            <div className='p-5 ' id='supportWrapper'>
                <h4>Support Portal</h4>
                <a href=''>Track Tickets</a>

            </div>

             <div className=' row p-3 m-3 ' >
                <div className=' col p-3' >
                    <h3>Search for an answer or browser help topics
                        to create a ticket.
                    </h3>

                    <input placeholder='Eg.fow do i activate F&O.' /><br/><br/>
                    <a href=''>Track Account opening </a>
                    <a href=''>Track segment activation </a>
                    <a href=''>Intraday margins </a>
                    <a href=''>Kite user manual </a>
                
                </div>  
                <div className=' col-6 p-3 ' >
                     <h3>Featured</h3>
                      <a href=''>1.Current Takeovers and Delisting - January 2024 </a><br/>
                       <br/><a href=''>2.Latest Intraday leverages -MIS &CO </a>
                </div>

                

            </div>
        </section>
     );
}

export default Hero;
