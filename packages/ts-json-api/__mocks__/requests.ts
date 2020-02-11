/**
 * This exists solely to ensure that it doesn't break the type.
 * It is checking:
 *   - `id` is not required
 *   - `relationships` can be provided
 */
import { Request } from '../src/types/requests';

export const request: Request = {
    data: {
        type: 'articles',
        attributes: {
            title: 'New Article Title'
        },
        relationships: {
            author: {
                data: {
                    type: 'people',
                    id: '1'
                }
            }
        }
    }
};
