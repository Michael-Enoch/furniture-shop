import { useCart } from "../context/CartContext"
import { useState } from "react"
import { Lock } from 'lucide-react'
import toast from "react-hot-toast"

const Checkout = () =>{

    const {cart} = useCart()
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)

    const [method, setMethod] = useState('')

    const pickMethod = (e) => {
        setMethod(e.target.id)
    }

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        zip: "",
        description: "",
        cardNumber: "",
        expDate: "",
        securityCode: "",
        cardName: "",
        payment: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone is required";
    }

    if (!formData.city.trim()) {
      errors.city = "City is required";
    }
    if (!formData.state.trim()) {
      errors.state = "State is required";
    }

    if (!formData.zip.trim()) {
      errors.zip = "Zip Code is required";
    }

    if (!formData.cardNumber.trim()) {
      errors.cardNumber = "Card Number is required";
    }

    if (!formData.expDate.trim()) {
      errors.expDate = "Expiration Date is required";
    }

    if (!formData.securityCode.trim()) {
      errors.securityCode = "Security Code is required";
    }

    if (!formData.cardName.trim()) {
      errors.cardName = "Card Name is required";
    }

    if (!method.trim()) {
      errors.payment = "Please choose a payment method";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
    };
    

    const handleSubmit = (e) => {
    e.preventDefault();
      if(validateForm()){
        setIsSubmitting(true);

      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        
        const shippingDetails = JSON.stringify(formData)
        localStorage.setItem('shippingDetails', shippingDetails)
        toast.success('Order placed sucesfully')
        
      }, 1500);
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
      }  
    };

    return (
        <>

        <div style={{backgroundColor: '#EAE6E1'}} className='flex gap-10 p-20 px-50 '>
            <form className='shadow rounded-md p-5 w-8/12 flex flex-col gap-5 bg-white' onSubmit={handleSubmit}>
                <h1 className="text-2xl font-medium">Shipping Address</h1>
                <div className="w-full flex flex-col gap-7"  >
                    <div className="w-full flex gap-5 items-center">
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="firstName">First Name*</label>
                            <input className='text-sm border rounded-md border-gray-100 px-3 py-2.5 w-full' 
                             type='text'
                             placeholder='Mark'
                             name="firstName"
                             onChange={handleChange}
                            />
                            { formErrors.firstName && (
                                <p className="text-red-500 h-0 -mt-2  text-xs">
                                    {formErrors.firstName} !
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="lastName">Last Name*</label>
                            <input className='text-sm border rounded-md border-gray-100 px-3 py-2.5 w-full' 
                             type='text'
                             placeholder='Tan'
                             name="lastName"
                             onChange={handleChange}
                            />
                            { formErrors.lastName && (
                                <p className="text-red-500 h-0 -mt-2  text-xs">
                                    {formErrors.lastName} !
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="w-full flex gap-5 items-center">
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="firstName">Email*</label>
                            <input className='text-sm border rounded-md border-gray-100 px-3 py-2.5 w-full' 
                             type='email'
                             name="email"
                             placeholder='mark@gmail.com'
                             onChange={handleChange}
                            />
                            { formErrors.email && (
                                <p className="text-red-500 h-0 -mt-2  text-xs">
                                    {formErrors.email} !
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="lastName">Phone Number*</label>
                            <input className='text-sm border rounded-md border-gray-100 px-3 py-2.5 w-full' 
                             type='number'
                             placeholder='09087362426'
                             name="phone"
                             onChange={handleChange}
                            />
                            { formErrors.phone && (
                                <p className="text-red-500 h-0 -mt-2  text-xs">
                                    {formErrors.phone} !
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="w-full flex gap-5 items-center">
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="firstName">City*</label>
                            <input className='text-sm border rounded-md border-gray-100 px-3 py-2.5 w-full' 
                             type='text'
                             placeholder='San-Francisco'
                             name="city"
                             onChange={handleChange}
                            />
                            { formErrors.city && (
                                <p className="text-red-500 h-0 -mt-2  text-xs">
                                    {formErrors.city} !
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="lastName">State*</label>
                            <input className='text-sm border rounded-md border-gray-100 px-3 py-2.5 w-full' 
                             placeholder='California'
                             type='text'
                             name='state'
                             onChange={handleChange}
                            />
                            { formErrors.state && (
                                <p className="text-red-500 h-0 -mt-2  text-xs">
                                    {formErrors.state} !
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="lastName">Zip Code*</label>
                            <input className='text-sm border rounded-md border-gray-100 px-3 py-2.5 w-full' 
                             type='number'
                             placeholder='55076'
                             name='zip'
                             onChange={handleChange}
                            />
                            { formErrors.zip && (
                                <p className="text-red-500 h-0 -mt-2  text-xs">
                                    {formErrors.zip} !
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="lastName">Description*</label>
                        <textarea className='text-sm border rounded-md border-gray-100 px-3 py-2.5 h-40 w-full' 
                            name="description"
                            onChange={handleChange}
                        >
                        </textarea>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <h1 className="text-2xl font-medium">Payment</h1>
                    <div className="flex flex-col"> 
                        <div className={`flex items-center justify-between w-full  px-3 py-2 border rounded-md
                            ${method == 'creditCard' ? 'border-black' : 'border-gray-100'} `}>
                            <div className='flex gap-2 items-center'>
                                <input onClick={pickMethod} 
                                 onChange={handleChange}
                                 className="bg-black accent-black" type="radio" name="payment" id="creditCard"
                                />
                                <label htmlFor="creditCard">Credit Card</label>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className='p-2 rounded-md border border-gray-100'>
                                    <img className="h-4" src="/src/assets/images/visa-10.svg" alt="" />
                                </div>
                                <div className="p-2 rounded-md border border-gray-100">
                                    <img className="h-4" src="/src/assets/images/mastercard-modern-design-.svg" alt="" />
                                </div>
                                {/* <img className="h-5" src="/src/assets/images/Amex-02.svg" alt="" /> */}
                            </div>
                        </div>
                        {
                            method == 'creditCard'  && 
                                <form action="" className='w-full border-l border-r  rounded  border-gray-100 p-2 flex flex-col gap-2'>
                                    <div className='text-sm border rounded-md border-gray-100 px-3 py-2.5 w-full flex justify-between items-center'>
                                        <input className='focus:white w-11/12 outline-none' 
                                         type="text" name="cardNumber" id="" 
                                         placeholder="Card Number" 
                                         onChange={handleChange}
                                        />
                                        <Lock size={18}/>
                                    </div>
                                    { formErrors.cardNumber && (
                                        <p className="text-red-500  text-xs">
                                            {formErrors.cardNumber} !
                                        </p>
                                    )}
                                    <div className='flex gap-5'>
                                        <div className="flex flex-col gap-2 w-full">
                                        <input className='text-sm border rounded-md border-gray-100 px-3 py-2.5 w-full'
                                         type="date" placeholder="Expiration Date"
                                         name="expDate"
                                         onChange={handleChange} 
                                        />
                                        { formErrors.expDate && (
                                            <p className="text-red-500  text-xs">
                                                {formErrors.expDate} !
                                            </p>
                                        )}
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                        <input className='text-sm border rounded-md border-gray-100 px-3 py-2.5 w-full'
                                         type="text" name="securityCode" 
                                         id="" placeholder="Security Code"
                                         onChange={handleChange}
                                        />
                                        { formErrors.securityCode && (
                                            <p className="text-red-500   text-xs">
                                                {formErrors.securityCode} !
                                            </p>
                                        )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                    <input className='text-sm border rounded-md border-gray-100 px-3 py-2.5 w-full'
                                     type="text" name="cardName" 
                                     id="" placeholder="Name on card" 
                                     onChange={handleChange}
                                    />
                                    { formErrors.cardName && (
                                        <p className="text-red-500  text-xs">
                                            {formErrors.cardName} !
                                        </p>
                                    )}
                                    </div>
                                </form>
                            
                        }
                        <div className={`flex items-center justify-between w-full  px-3 py-2 border rounded-md
                            ${method == 'payPal' ? 'border-black' : 'border-gray-100'} `}>
                            <div className='flex gap-2 items-center'>
                                <input onClick={pickMethod} onChange={handleChange} className="bg-black accent-black" type="radio" name="payment" id="payPal" />
                                <label htmlFor="payPal">Pay Pal</label>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className='p-2 rounded-md border border-gray-100'>
                                    <img className="h-4" src="/src/assets/images/Paypal-11.svg" alt="" />
                                </div>
                            
                            </div>
                            
                        </div>
                        {
                            method == 'payPal'  && 
                                <form action="" className='w-full border-l border-r border-b  rounded  border-gray-100 p-2 flex flex-col gap-2'>
                                    <div className='flex items-center justify-between'>
                                        <p>Already have PayPal account?</p>
                                        <a href='https://www.paypal.com/signin' target="blank"
                                         className='bg-blue-600 text-white px-7 py-2 rounded-md mt-2'>
                                         Log in
                                        </a>
                                        
                                    </div>
                                    <div className="flex gap-2 items-center p-3">
                                        <div className="w-full h-px bg-black"></div>
                                         Or <div className="w-full h-px bg-black"></div>
                                    </div>
                                    <div className='text-sm border rounded-md border-gray-100 px-3 py-2.5 w-full flex justify-between items-center'>
                                        <input className='focus:white w-11/12 outline-none' 
                                         type="text" name="cardNumber" id="" 
                                         placeholder="Card Number" 
                                         onChange={handleChange}
                                        />
                                        <Lock size={18}/>
                                    </div>
                                    { formErrors.cardNumber && (
                                        <p className="text-red-500  text-xs">
                                            {formErrors.cardNumber} !
                                        </p>
                                    )}
                                    <div className='flex gap-5'>
                                        <div className="flex flex-col gap-2 w-full">
                                        <input className='text-sm border rounded-md border-gray-100 px-3 py-2.5 w-full'
                                         type="date" placeholder="Expiration Date"
                                         name="expDate"
                                         onChange={handleChange} 
                                        />
                                        { formErrors.expDate && (
                                            <p className="text-red-500  text-xs">
                                                {formErrors.expDate} !
                                            </p>
                                        )}
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                        <input className='text-sm border rounded-md border-gray-100 px-3 py-2.5 w-full'
                                         type="text" name="securityCode" 
                                         id="" placeholder="Security Code"
                                         onChange={handleChange}
                                        />
                                        { formErrors.securityCode && (
                                            <p className="text-red-500   text-xs">
                                                {formErrors.securityCode} !
                                            </p>
                                        )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                    <input className='text-sm border rounded-md border-gray-100 px-3 py-2.5 w-full'
                                     type="text" name="cardName" 
                                     id="" placeholder="Name on card" 
                                     onChange={handleChange}
                                    />
                                    { formErrors.cardName && (
                                        <p className="text-red-500  text-xs">
                                            {formErrors.cardName} !
                                        </p>
                                    )}
                                    </div>
                                </form>
                            
                        }
                        { formErrors.payment && (
                            <p className="text-red-500 pt-2 text-xs">
                                {formErrors.payment} !
                            </p>
                        )}
                    </div>
                </div>
                <button disabled={isSubmitting} className='bg-black text-white p-3 rounded-md mt-2'>
                    {isSubmitting ? (
                        <div className="flex gap-3 items-center justify-center">
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            <span>Sending Order...</span>
                        </div>
                    ) : (            
                        <span>Pay Now</span>
                    )}
                </button>
            </form>
            <div className="bg-inherit h-fit p-5 border border-gray-300 shadow w-5/12 rounded-md flex flex-col gap-5">
                <h1 className="text-3xl ">Your Cart</h1>
                <div className='flex flex-col gap-4 border-b  border-b-gray-300 pb-4'>
                    {
                        cart.map((item) =>(
                            <div key={item.id} className="flex justify-between w-full items-center">
                                <div className="flex gap-3 relative">
                                    <img className="h-15 w-15 rounded-md" src={item.image} alt="" />
                                    <span className="absolute bg-black text-white text-sm h-5 w-5 rounded-full flex items-center justify-center -top-2 left-12">
                                        {item.quantity}
                                    </span>
                                    <div>
                                      <h3 className="text-sm font-medium">{item.name}</h3>
                                      <p className="text-sm">{item.category}</p>
                                    </div>
                                </div>
                                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))
                    }
                </div >
                <div className='flex flex-col gap-3'>
                  <div className='flex flex-col gap-2 border-b border-b-gray-300 pb-2'>
                    <div className='flex justify-between items-center'>
                        <p className='font-medium'>SubTotal</p>
                        <p>${total}</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className='font-medium'>Shipping</p>
                        <p className="font-medium">$0.00</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className='font-medium'>Discount</p>
                        <p className="font-medium">$0.00</p>
                    </div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <p className="font-medium text-lg">Total</p>
                    <p className="font-medium">${total}</p>
                  </div>
                  {/* <button className='bg-black text-white p-3 rounded-md mt-2'>Continue to payment</button> */}
                </div>
            </div>
        </div>
        </>
    )
}

export default Checkout