import * as React from 'react';

import Icon from '../icon';
import InputGroup from '../input-group';

import bxX from '../../../public/icons/bx-x.svg';

import styles from './index.module.scss';

import type { ServingUnit } from '@prisma/client';

type ComponentProps = {
    closeDialog: (editType: string, changeMade: boolean) => void;
    editType: 'categories' | 'serving units';
    servingUnits: ServingUnit[];
}

const EditDataDialog = ({
    closeDialog,
    editType,
    servingUnits,
}: ComponentProps) => {
    // Refs
    const headerRef = React.useRef(null);
    const servingUnitUpdateNameRef = React.useRef(null);
    const servingUnitUpdateNamePluralRef = React.useRef(null);

    // States
    const [changeMade, setChangeMade] = React.useState(false);
    const [formFeedback, setFormFeedback] = React.useState('');

    // Effects
    React.useEffect(() => {
        const header = headerRef.current;
        if (header) (header as HTMLElement).focus();

        document.body.style.height = '100vh';
        document.body.style.overflow = 'hidden';

        return function cleanup() {
            document.body.style.removeProperty('height');
            document.body.style.removeProperty('overflow');
        };
    }, []);

    // Event listeners
    function onChangeUpdateServingUnitNames(event: React.ChangeEvent<HTMLSelectElement>) {
        if (!event.target) return;
        if (!servingUnitUpdateNameRef.current) return;
        if (!servingUnitUpdateNamePluralRef.current) return;

        const select = event.target as HTMLSelectElement;
        const inputName = servingUnitUpdateNameRef.current as HTMLInputElement;
        const inputNamePlural = servingUnitUpdateNamePluralRef.current as HTMLInputElement;

        const selectedServingUnit = servingUnits.find(servingUnit => servingUnit.id === parseInt(select.value));

        if (selectedServingUnit) {
            inputName.value = selectedServingUnit.name;
            inputNamePlural.value = selectedServingUnit.namePlural;
        }
    }

    function onSubmitAddServingUnit(event: React.FormEvent) {
        event.preventDefault();
        if (!event.target) return;
        setFormFeedback('');

        const formElement = (event.target as HTMLFormElement);
        const formData = new FormData(formElement);

        const formDataName = formData.get('add-name');
        const nameValidated = (formDataName) ? formDataName.toString() : undefined;
        if (!nameValidated) {
            setFormFeedback('Form error: \'Name\' value must be a string.');
            return;
        }

        const formDataNamePlural = formData.get('add-name-plural');
        const namePluralValidated = (formDataNamePlural) ? formDataNamePlural.toString() : undefined;
        if (!namePluralValidated) {
            setFormFeedback('Form error: \'Name (when plural)\' value must be a string.');
            return;
        }

        const queryString = `/api/serving-unit?name=${nameValidated}&namePlural=${namePluralValidated}`;

        try {
            fetch(queryString, {
                method: 'POST',
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        setFormFeedback(`Form error: ${data.error}`);
                        return;
                    }

                    if (data.code) {
                        setFormFeedback(`Form error: ${data.code}: ${data.message}`);
                        return;
                    }

                    setFormFeedback(`Form success: New 'serving unit' created (name: "${nameValidated}", namePlural: "${namePluralValidated}").`);
                    setChangeMade(true);
                });
        } catch (error) {
            setFormFeedback('Form error: Please try again.');
        }
    }

    function onSubmitDeleteServingUnit(event: React.FormEvent) {
        event.preventDefault();
        if (!event.target) return;
        setFormFeedback('');

        const formElement = (event.target as HTMLFormElement);
        const formData = new FormData(formElement);

        const formDataId = formData.get('delete-id');
        const idValidated = (formDataId && !isNaN(parseInt(formDataId as string))) ? formDataId : undefined;
        if (!idValidated) {
            setFormFeedback('Form error: \'Id\' value must be a number.');
            return;
        }

        const queryString = `/api/serving-unit?id=${idValidated}`;

        try {
            fetch(queryString, {
                method: 'DELETE',
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        setFormFeedback(`Form error: ${data.error}`);
                        return;
                    }

                    if (data.code) {
                        setFormFeedback(`Form error: ${data.code}: ${data.message}`);
                        return;
                    }

                    setFormFeedback(`Form success: 'serving unit' deleted (name: "${data.name}").`);
                    setChangeMade(true);
                });
        } catch (error) {
            setFormFeedback('Form error: Please try again.');
        }
    }

    function onSubmitUpdateServingUnit(event: React.FormEvent) {
        event.preventDefault();
        if (!event.target) return;
        setFormFeedback('');

        const formElement = (event.target as HTMLFormElement);
        const formData = new FormData(formElement);

        const formDataId = formData.get('update-id');
        const idValidated = (formDataId && !isNaN(parseInt(formDataId as string))) ? formDataId : undefined;
        if (!idValidated) {
            setFormFeedback('Form error: \'Id\' value must be a number.');
            return;
        }

        const formDataName = formData.get('update-name');
        const nameValidated = (formDataName) ? formDataName.toString() : undefined;
        if (!nameValidated) {
            setFormFeedback('Form error: \'Name\' value must be a string.');
            return;
        }

        const formDataNamePlural = formData.get('update-name-plural');
        const namePluralValidated = (formDataNamePlural) ? formDataNamePlural.toString() : undefined;
        if (!namePluralValidated) {
            setFormFeedback('Form error: \'Name (when plural)\' value must be a string.');
            return;
        }

        const queryString = `/api/serving-unit?id=${idValidated}&name=${nameValidated}&namePlural=${namePluralValidated}`;

        try {
            fetch(queryString, {
                method: 'PUT',
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        setFormFeedback(`Form error: ${data.error}`);
                        return;
                    }

                    if (data.code) {
                        setFormFeedback(`Form error: ${data.code}: ${data.message}`);
                        return;
                    }

                    setFormFeedback(`Form success: 'serving unit' updated (name: '${data.name}', namePlural: '${data.namePlural}').`);
                    setChangeMade(true);
                });
        } catch (error) {
            setFormFeedback('Form error: Please try again.');
        }
    }

    // Renderers
    function renderBody() {
        if (editType === 'serving units') {
            return (
                <>
                    <details>
                        <summary>Add</summary>

                        <form onSubmit={onSubmitAddServingUnit}>
                            <InputGroup
                                input={<input id='add-name' name='add-name' required type='text' />}
                                label={<label htmlFor='add-name'>Name</label>}
                            />

                            <InputGroup
                                input={<input id='add-name-plural' name='add-name-plural' required type='text' />}
                                label={<label htmlFor='add-name-plural'>Name (when plural)</label>}
                            />

                            <div>
                                <input type='submit' value='Add serving unit' />
                            </div>

                            <hr />
                        </form>
                    </details>

                    <details>
                        <summary>Delete</summary>

                        <form onSubmit={onSubmitDeleteServingUnit}>
                            <InputGroup
                                input={<select id='delete-id' name='delete-id'>
                                    <option value=''>-- Select a course type --</option>
                                    {servingUnits.map((servingUnit) => {
                                        return <option key={`delete-id-${servingUnit.id}`} value={servingUnit.id}>
                                            {servingUnit.name}
                                        </option>;
                                    })}
                                </select>}
                                label={<label htmlFor='delete-id'>Serving unit</label>}
                            />

                            <div>
                                <input type='submit' value='Delete serving unit' />
                            </div>
                        </form>
                    </details>

                    <details>
                        <summary>Update</summary>

                        <form onSubmit={onSubmitUpdateServingUnit}>
                            <InputGroup
                                input={<select id='update-id' onChange={onChangeUpdateServingUnitNames} name='update-id'>
                                    <option value=''>-- Select a course type --</option>
                                    {servingUnits.map((servingUnit) => {
                                        return <option key={`update-id-${servingUnit.id}`} value={servingUnit.id}>
                                            {servingUnit.name}
                                        </option>;
                                    })}
                                </select>}
                                label={<label htmlFor='update-id'>Serving unit</label>}
                            />

                            <InputGroup
                                input={<input id='update-name' name='update-name' ref={servingUnitUpdateNameRef} required type='text' />}
                                label={<label htmlFor='update-name'>Name</label>}
                            />

                            <InputGroup
                                input={<input id='update-name-plural' name='update-name-plural' ref={servingUnitUpdateNamePluralRef} required type='text' />}
                                label={<label htmlFor='update-name-plural'>Name (when plural)</label>}
                            />

                            <div>
                                <input type='submit' value='Update serving unit' />
                            </div>
                        </form>
                    </details>
                </>
            );
        } else {
            return <></>;
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.background}></div>
            <div
                aria-modal='true'
                aria-labelledby='dialog-header'
                className={styles.dialog}
                role='dialog'
            >
                <div className={styles.header}>
                    <h2 id='dialog-header' ref={headerRef} tabIndex={-1}>Edit {editType}</h2>
                    <button aria-label='Close dialog' className='icon-only' onClick={() => closeDialog(editType, changeMade)}>
                        <Icon ariaHidden={true} Icon={bxX} />
                    </button>
                </div>
                <div className={styles.body}>
                    {renderBody()}
                    {formFeedback.length > 0 &&
                        <p aria-live='assertive'>{formFeedback}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default EditDataDialog;
