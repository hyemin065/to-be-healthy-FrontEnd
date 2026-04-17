import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Button } from '../button';
import { Sheet } from '../sheet';

const meta: Meta<typeof Sheet> = {
  title: 'Components/Sheet',
  component: Sheet,
};
export default meta;

type Story = StoryObj<typeof Sheet>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <Sheet.Trigger asChild>
        <Button>시트 열기</Button>
      </Sheet.Trigger>
      <Sheet.Content side='bottom'>
        <Sheet.Header>
          <Sheet.Title>필터 설정</Sheet.Title>
          <Sheet.Description>원하는 조건을 선택하세요.</Sheet.Description>
        </Sheet.Header>
        <div className='flex flex-col gap-4 py-4'>
          <p>시트 콘텐츠 영역</p>
        </div>
        <Sheet.Footer>
          <Button className='w-full'>적용하기</Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: '시트 열기' });
    await userEvent.click(trigger);

    const dialog = await within(document.body).findByRole('dialog');
    await expect(dialog).toBeInTheDocument();

    const title = within(dialog).getByText('필터 설정');
    await expect(title).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
  },
};

export const ThumbHeader: Story = {
  name: 'With Thumb Header',
  render: () => (
    <Sheet>
      <Sheet.Trigger asChild>
        <Button variant='outline'>드래그 시트</Button>
      </Sheet.Trigger>
      <Sheet.Content side='bottom' headerType='thumb'>
        <Sheet.Header>
          <Sheet.Title>스케줄 상세</Sheet.Title>
        </Sheet.Header>
        <div className='py-4'>
          <p>스와이프로 닫을 수 있는 시트입니다.</p>
        </div>
      </Sheet.Content>
    </Sheet>
  ),
};
