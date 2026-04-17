import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta = {
  title: 'Design Tokens/Overview',
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj;

/* ── Color Palette ─────────────────────────────────────────────── */

const ColorSwatch = ({ name, cssVar }: { name: string; cssVar: string }) => (
  <div className='flex items-center gap-3'>
    <div
      className='h-10 w-10 rounded-md border border-gray-200'
      style={{ backgroundColor: `var(${cssVar})` }}
    />
    <div>
      <p className='text-sm font-medium'>{name}</p>
      <p className='text-xs text-gray-500'>{cssVar}</p>
    </div>
  </div>
);

const ColorGroup = ({ title, colors }: { title: string; colors: { name: string; cssVar: string }[] }) => (
  <div>
    <h3 className='mb-3 text-lg font-bold'>{title}</h3>
    <div className='grid grid-cols-2 gap-3'>
      {colors.map((c) => (
        <ColorSwatch key={c.cssVar} {...c} />
      ))}
    </div>
  </div>
);

export const Colors: Story = {
  render: () => (
    <div className='flex flex-col gap-8 p-6'>
      <h2 className='text-2xl font-bold'>Color Tokens</h2>

      <ColorGroup
        title='Blue (Brand Primary)'
        colors={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((n) => ({
          name: `blue-${n}`,
          cssVar: `--color-blue-${n}`,
        }))}
      />

      <ColorGroup
        title='Gray (Neutral)'
        colors={[50, 100, 200, 300, 400, 500, 600, 700, 800].map((n) => ({
          name: `gray-${n}`,
          cssVar: `--color-gray-${n}`,
        }))}
      />

      <ColorGroup
        title='Semantic - Surface'
        colors={[
          { name: 'primary', cssVar: '--surface-primary' },
          { name: 'secondary', cssVar: '--surface-secondary' },
          { name: 'background', cssVar: '--surface-background' },
          { name: 'disabled', cssVar: '--surface-disabled' },
          { name: 'danger', cssVar: '--surface-danger' },
        ]}
      />

      <ColorGroup
        title='Semantic - Text'
        colors={[
          { name: 'primary', cssVar: '--text-primary' },
          { name: 'secondary', cssVar: '--text-secondary' },
          { name: 'tertiary', cssVar: '--text-tertiary' },
          { name: 'accent', cssVar: '--text-accent' },
          { name: 'danger', cssVar: '--text-danger' },
        ]}
      />

      <ColorGroup
        title='Semantic - Interactive'
        colors={[
          { name: 'primary', cssVar: '--interactive-primary' },
          { name: 'primary-hover', cssVar: '--interactive-primary-hover' },
          { name: 'primary-active', cssVar: '--interactive-primary-active' },
          { name: 'destructive', cssVar: '--interactive-destructive' },
        ]}
      />
    </div>
  ),
};

/* ── Typography Scale ──────────────────────────────────────────── */

const TypographySample = ({ name, cssVar, weight }: { name: string; cssVar: string; weight: string }) => (
  <div className='flex items-baseline gap-4 border-b border-gray-100 py-2'>
    <span className='w-24 text-xs text-gray-500'>{name}</span>
    <span style={{ fontSize: `var(${cssVar})`, fontWeight: weight }}>
      건강해짐 Typography
    </span>
    <span className='text-xs text-gray-400'>{cssVar}</span>
  </div>
);

export const TypographyScale: Story = {
  render: () => (
    <div className='flex flex-col gap-2 p-6'>
      <h2 className='mb-4 text-2xl font-bold'>Typography Scale</h2>
      <TypographySample name='font-size-5xl' cssVar='--font-size-5xl' weight='700' />
      <TypographySample name='font-size-4xl' cssVar='--font-size-4xl' weight='700' />
      <TypographySample name='font-size-3xl' cssVar='--font-size-3xl' weight='700' />
      <TypographySample name='font-size-2xl' cssVar='--font-size-2xl' weight='700' />
      <TypographySample name='font-size-xl' cssVar='--font-size-xl' weight='600' />
      <TypographySample name='font-size-lg' cssVar='--font-size-lg' weight='600' />
      <TypographySample name='font-size-base' cssVar='--font-size-base' weight='400' />
      <TypographySample name='font-size-md' cssVar='--font-size-md' weight='400' />
      <TypographySample name='font-size-sm' cssVar='--font-size-sm' weight='400' />
      <TypographySample name='font-size-xs' cssVar='--font-size-xs' weight='500' />
    </div>
  ),
};

/* ── Spacing Scale ─────────────────────────────────────────────── */

export const SpacingScale: Story = {
  render: () => (
    <div className='flex flex-col gap-4 p-6'>
      <h2 className='mb-4 text-2xl font-bold'>Spacing Scale</h2>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
        <div key={n} className='flex items-center gap-4'>
          <span className='w-8 text-right text-sm text-gray-500'>{n}</span>
          <div
            className='h-4 rounded bg-interactive-primary'
            style={{ width: `var(--spacing-${n})` }}
          />
          <span className='text-xs text-gray-400'>--spacing-{n}</span>
        </div>
      ))}
    </div>
  ),
};

/* ── Border Radius ─────────────────────────────────────────────── */

export const BorderRadius: Story = {
  render: () => (
    <div className='flex flex-col gap-4 p-6'>
      <h2 className='mb-4 text-2xl font-bold'>Border Radius</h2>
      <div className='flex gap-6'>
        {[
          { name: 'radius-s (4px)', cssVar: '--radius-s' },
          { name: 'radius-m (8px)', cssVar: '--radius-m' },
          { name: 'radius-l (12px)', cssVar: '--radius-l' },
        ].map((r) => (
          <div key={r.cssVar} className='flex flex-col items-center gap-2'>
            <div
              className='flex h-16 w-16 items-center justify-center bg-interactive-primary text-white'
              style={{ borderRadius: `var(${r.cssVar})` }}>
              Aa
            </div>
            <span className='text-xs text-gray-500'>{r.name}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ── Shadows ───────────────────────────────────────────────────── */

export const Shadows: Story = {
  render: () => (
    <div className='flex flex-col gap-6 p-6'>
      <h2 className='mb-4 text-2xl font-bold'>Shadows</h2>
      <div className='flex gap-6'>
        {[
          { name: 'shadow-sm', cssVar: '--shadow-sm' },
          { name: 'shadow-md', cssVar: '--shadow-md' },
          { name: 'shadow-lg', cssVar: '--shadow-lg' },
          { name: 'shadow-card', cssVar: '--shadow-card' },
        ].map((s) => (
          <div
            key={s.cssVar}
            className='flex h-20 w-20 items-center justify-center rounded-lg bg-white text-xs'
            style={{ boxShadow: `var(${s.cssVar})` }}>
            {s.name}
          </div>
        ))}
      </div>
    </div>
  ),
};
