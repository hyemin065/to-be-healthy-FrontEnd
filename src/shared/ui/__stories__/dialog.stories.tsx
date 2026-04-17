import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { Button } from '../button';
import { Dialog } from '../dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
};
export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>다이얼로그 열기</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>알림</Dialog.Title>
          <Dialog.Description>다이얼로그 설명 텍스트입니다.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant='outline'>취소</Button>
          </Dialog.Close>
          <Button>확인</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: '다이얼로그 열기' });
    await userEvent.click(trigger);

    const dialog = await within(document.body).findByRole('dialog');
    await expect(dialog).toBeInTheDocument();

    const title = within(dialog).getByText('알림');
    await expect(title).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
  },
};

export const WithContent: Story = {
  name: 'With Rich Content',
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>프로필 수정</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>프로필 수정</Dialog.Title>
          <Dialog.Description>
            변경하고 싶은 정보를 수정한 후 저장 버튼을 눌러주세요.
          </Dialog.Description>
        </Dialog.Header>
        <div className='flex flex-col gap-4 py-4'>
          <input
            className='rounded-md border border-border-default px-4 py-2'
            placeholder='이름'
            aria-label='이름'
          />
          <input
            className='rounded-md border border-border-default px-4 py-2'
            placeholder='이메일'
            aria-label='이메일'
          />
        </div>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant='outline'>취소</Button>
          </Dialog.Close>
          <Button>저장</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
};
