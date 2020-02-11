import styled from 'styled-components';
import React from 'react';

interface ParametersProps {
    parameters: ParametrConfig[];
}

interface ParametrConfig {
    default?: string;
    description: string;
    name: string;
    required?: boolean;
}

const Parameters: React.FunctionComponent<ParametersProps> = ({
    parameters,
}) => {
    const showDefaults = parameters.some(
        parameter => parameter.default !== undefined
    );

    const showRequired = parameters.some(
        parameter => parameter.required !== undefined
    );

    return (
        <Table>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Description</td>
                    {showRequired && <td>Required</td>}
                    {showDefaults && <td>Default</td>}
                </tr>
            </thead>

            <tbody>
                {parameters.map(parameter => (
                    <tr>
                        <td>{parameter.name}</td>
                        <td>{parameter.description}</td>
                        {showRequired && (
                            <td>{parameter.required ? 'Yes' : 'No'}</td>
                        )}
                        {showDefaults && <td>{parameter.default}</td>}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default Parameters;

const Table = styled.table`
    td {
        padding: 1em;
    }

    thead {
        font-weight: bold;

        td {
            background-color: #808080;
            color: #fff;
        }
    }

    tbody {
        td {
            background-color: #f7f7f7;
        }

        tr:nth-child(even) td {
            background-color: #f0f0f0;
        }
    }
`;
