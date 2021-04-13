import type { FunctionComponent } from 'react';
import React from 'react';
import { ActionIconButton } from '@davidjcastner/ui';

export const Controls: FunctionComponent = () => {
    return <div className='hashi-controls'>
        <ActionIconButton icon='play_arrow' />
        <ActionIconButton icon='pause' />
        <ActionIconButton icon='replay' />
    </div>;
};
