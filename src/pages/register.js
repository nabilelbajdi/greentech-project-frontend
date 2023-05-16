import { useRef, useState } from "react";
import InputField from "@/components/InputField";
import { FiUser } from 'react-icons/fi';
import Button from "@/components/Button";
import { useRouter } from "next/router";

const countries = [
    'Sverige',
    'Norge',
    'Danmark'
]

const cities = [
    'Stockholm',
    'Oslo',
    'Köpenhamn'
]

const Register = () => {

    const firstName = useRef(null);
    const lastName = useRef(null);
    const country = useRef(null);
    const city = useRef(null);
    const dateOfBirth = useRef(null);
    const [firstNameIncomplete, setFirstNameIncomplete] = useState(false);
    const [lastNameIncomplete, setLastNameIncomplete] = useState(false);
    const [countryIncomplete, setCountryIncomplete] = useState(false);
    const [cityIncomplete, setCityIncomplete] = useState(false);
    const [dateOfBirthIncomplete, setDateOfBirthIncomplete] = useState(false);
    const router = useRouter();

    const register = async (e) => {
        e.preventDefault();
        let incomplete = false;

        if (firstName.current.value.length < 1) {
            setFirstNameIncomplete(true);
            incomplete = true;
        }

        if (lastName.current.value.length < 1) {
            setLastNameIncomplete(true);
            incomplete = true;
        }

        if (country.current.value.length < 1) {
            setCountryIncomplete(true);
            incomplete = true;
        }

        if (city.current.value.length < 1) {
            setCityIncomplete(true);
            incomplete = true;
        }

        if (dateOfBirth.current.value.length < 1) {
            setDateOfBirthIncomplete(true);
            incomplete = true;
        }

        if (incomplete) return;

        const data = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            country: country.current.value,
            city: city.current.value,
            dateOfBirth: dateOfBirth.current.value,
        }

        const response = await fetch('http://localhost:3000/api/register', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {

            console.log('Something went wrong.');
            return;

        }

        router.push('/')


    }

    const resetIncomplete = (incomplete, callback) => {

        if (incomplete) {

            callback(false);

        }

    }

    return (
        <div className='flex justify-center w-full'>
            <div className='flex justify-center w-full sm:w-4/5 sm:max-w-[400px] min-h-full bg-chas-secondary'>
                <div className="flex flex-col gap-8 p-8 w-full max-w-[400px] min-h-full justify-center items-center">
                    <div className='rounded-full p-3 bg-white text-5xl'><FiUser /></div>
                    <form onSubmit={e => register(e)} className='flex flex-col gap-4 w-full'>
                        <InputField change={() => { resetIncomplete(firstNameIncomplete, setFirstNameIncomplete) }} name='firstName' label='Förnamn *' elementRef={firstName} incomplete={firstNameIncomplete} />
                        <InputField change={() => { resetIncomplete(lastNameIncomplete, setLastNameIncomplete) }} name='lastName' label='Efternamn *' elementRef={lastName} incomplete={lastNameIncomplete} />
                        <InputField change={() => { resetIncomplete(countryIncomplete, setCountryIncomplete) }} name='country' label='Land *' type='select' elementRef={country} placeholder={'Vänligen välj'} options={countries} incomplete={countryIncomplete} />
                        <InputField change={() => { resetIncomplete(cityIncomplete, setCityIncomplete) }} name='city' label='Stad *' type='select' elementRef={city} placeholder={'Vänligen välj'} options={cities} incomplete={cityIncomplete} />
                        <InputField change={() => { resetIncomplete(dateOfBirthIncomplete, setDateOfBirthIncomplete) }} name='dateOfBirth' type='date' label='Födelsedatum *' elementRef={dateOfBirth} incomplete={dateOfBirthIncomplete} />
                        <div className="flex flex-col mx-6 my-4">
                            <Button title='Spara' type='submit' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;