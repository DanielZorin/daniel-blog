import React from 'react'
import { selectLanguage, selectPlans } from '../redux/selectors';
import { fetchPlans } from '../redux/actions';
import { useSelector } from 'react-redux';
import { store } from '../redux/store';

const PlansPage = () => {
    let data = useSelector(selectPlans);
    const lang = useSelector(selectLanguage)
    console.log(data)

    React.useEffect(() => store.dispatch(fetchPlans(lang)), [lang]);

    return <>
        <p>
            {
                data.map((entry, i) =>
                    <>
                        {entry}
                        <br />
                    </>)
            }
        </p>
    </>
}

export default PlansPage;