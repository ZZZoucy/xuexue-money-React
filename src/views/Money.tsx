import Layout from '../components/Layout';
import React, { useState } from 'react';
import styled from 'styled-components';
import { CategorySection } from './Money/CategorySection';
import { TagsSection } from './Money/TagsSection';
import { NoteSection } from './Money/NoteSection';
import { NumberPadSection } from './Money/NumberPadSection';
import { useRecords } from 'hooks/useRecords';


const MyLayout = styled(Layout)`
  display:flex;
  flex-direction: column;
`

const CategoryWrapper = styled.div`
  background:#B7DCD3; 
`

type Category = '-' | '+';

const defaultFormData = {
  tagIds: [] as number[],
  note: '',
  category: '-' as Category,
  amount: 0
}

function Money() {
  const [selected, setSelected] = useState(defaultFormData);
  const onChange = (obj:Partial<typeof selected>) => {
    setSelected({...selected,...obj});
  }
  const {addRecord} = useRecords();
  const submit = () => {
    if(addRecord(selected)){
      window.alert('已保存');
      setSelected(defaultFormData);
    };
  }
  return (
    <MyLayout scrollTop={9999}>
      <CategoryWrapper>
        <CategorySection value={selected.category} onChange={category => onChange({category})}/>
      </CategoryWrapper>
      <TagsSection value={selected.tagIds} onChange={tagIds => onChange({tagIds})}/>
      <NoteSection value={selected.note} onChange={note => onChange({note})}/>
      <NumberPadSection value={selected.amount} onChange={amount => onChange({amount})} onOK={submit}/>
    </MyLayout>
  );
}

export default Money;
