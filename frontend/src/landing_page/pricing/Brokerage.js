import React from 'react';

function Brokerage() {
    return ( 
        <div className='container'>
            <div className='row'>
                <div className='col-8'>
                    <h1 className='fs-4 text-center ' style={{color:"rgb(47, 152, 186)"}}>
                        Brokerage calculator
                    </h1>
                        <ul>
                            <li className='text-muted mt-5'>Call & Trade and RMS auto-squareoff:
                                Additional charges of  <i class="fa fa-inr" aria-hidden="true"></i> 50+ GST per order.
                            </li>
                            <li className='text-muted mt-3'>
                                Digital contract notes be sent via e-mail.
                            </li>
                            <li className='text-muted mt-3'>
                                Physical copies of contract notes,if required
                                , shall be charged  <i class="fa fa-inr" aria-hidden="true"></i>
                                20 per contract note.Courier charges apply.
                            </li>
                            <li className='text-muted mt-3'>
                                For NRI account (non-PIS) ,0.5% or  <i class="fa fa-inr" aria-hidden="true"></i>
                                per executed order for equity (whichever is lower).
                            </li>
                            <li className='text-muted mt-3'>
                                For NRI account(PSI),0.5% or  <i class="fa fa-inr" aria-hidden="true"></i>
                                per executed order for equity(whichever is lower).
                            </li>
                            <li className='text-muted mt-3'>
                                If the account is in debit balance, any order placed
                                will be charged  <i class="fa fa-inr" aria-hidden="true"></i> 40
                                per executed order insted of  <i class="fa fa-inr" aria-hidden="true"></i>
                                20 per extcuted order.
                            </li>
                            

                        </ul>
                    

                </div>
                <div className='col-4'>
                     <h1 className='fs-4 text-center ' style={{color:"rgb(47, 152, 186)"}}>
                       List of charges
                    </h1>

                </div>
            </div>
        </div>
     );
}

export default Brokerage;