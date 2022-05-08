import React, { FC } from 'react';

const basics = () => {
    let Array_Of_Fixed_Type1: string[] = ['12']
    let Array_Of_Fixed_Type2: number[] = [12]

    // Type aliases
    type PersonType = {
        name: string,
        age: number,
        adult: boolean
    }
    let type_of_an_object: PersonType = {
        name: 'banna',
        age: 12,
        adult: true
    }
    let type_of_an_array_Of_object: PersonType[] = [{
        name: 'banna',
        age: 12,
        adult: true
    }]

    // type inference is automatic set types to type of its initial declaration in stead of any!

    // multiple(Union) types
    let multiple_fixed_types: string | boolean | number | string[] | Array<number>
    multiple_fixed_types = ['12']

    // Functions types
    // number[] === Array < number >

    // Generics
    function GenericTypes<T>(array: T[], newValue: T): T[] {
        return [...array, newValue]
    }
    console.log(GenericTypes<number>([15, 16], 49));
};
const TSComponen1: FC<{ items?: string[], newItem: string | object[] }> = (props) => {

    return (
        <div>
            {
                props.items?.map(x => <p>{x}</p>)
            }
        </div>
    );
};

export default TSComponen1; 