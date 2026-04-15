import React from 'react';

function Stats() {
    return (  
        <div className='container p-3'>
            <div className='row p-5 '>
                <div className='col-6 p-5 '>
                    <h1 className='fs-2'>Trust with Confidence</h1>
                    <h2 className='mt-5 fs-4'>Customer-first always</h2>
                    <p className='text-muted'>
                    That's why 1.3+ crore customers trust Zerodha
                    with 3.5+lakh crores worth of equility investments.
                    </p>

                    <h2 className='fs-4'>No spam gimmicks</h2>
                    <p className='text-muted'>
                    No gimmicks,spam,"gamification", or annoying push
                    notifications.High quality apps that you use at your
                    pace,the way you like.
                    </p>

                    <h2 className='fs-4'>The Zerodha universe</h2>
                    <p className='text-muted'>
                   Not just an app,but a whole ecosystem.Our investments
                   in 30+fintech startups offer you tailorid service
                   specofic to your needs.
                    </p>

                    <h2 className='fs-4'>Do better with money</h2>
                    <p className='text-muted'>
                   With initiatives like Nudgw and kill Switch,we 
                   don't just facilitate transactions,but actively help
                   you do better with your money.
                    </p>
                </div>
                <div className='col-6'>
                    <img src='media/images/ecosystem.png' style={{width:"75%"}}/>
                    <div className='text-center'>
                        <a href='' className='mx-5' style={{textDecoration:"none"}}>Explore our products<i class="fa-solid fa-arrow-right"></i></a>
                        <a href='' style={{textDecoration:"none"}}>Try kit demo<i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Stats;