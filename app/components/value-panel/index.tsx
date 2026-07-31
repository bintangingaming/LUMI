'use client'
import type { FC, ReactNode } from 'react'
import React from 'react'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import s from './style.module.css'
import { StarIcon } from '@/app/components/welcome/massive-component'
import Button from '@/app/components/base/button'

export interface ITemplateVarPanelProps {
  className?: string
  header: ReactNode
  children?: ReactNode | null
  isFold: boolean
}

const TemplateVarPanel: FC<ITemplateVarPanelProps> = ({
  className,
  header,
  children,
  isFold,
}) => {
  return (
    <div className={cn(
      isFold ? "border border-slate-700/60" : s.boxShodow,
      className,
      "rounded-xl bg-slate-900/70 backdrop-blur-xl text-slate-100 shadow-2xl"
    )}>
      {/* header */}
      <div
        className={cn(
          isFold && "rounded-b-xl",
          "rounded-t-xl px-6 py-4 bg-slate-800/40 text-xs border-b border-slate-800/80"
        )}
      >
        {header}
      </div>
      {/* body */}
      {!isFold && children && (
        <div className="rounded-b-xl p-6 bg-transparent">
          {children}
        </div>
      )}
    </div>
  )
}

export const PanelTitle: FC<{ title: string, className?: string }> = ({
  title,
  className,
}) => {
  return (
    <div className={cn(className, "flex items-center space-x-1 text-indigo-400 font-medium")}>
      <StarIcon />
      <span className="text-xs text-slate-200">{title}</span>
    </div>
  )
}

export const VarOpBtnGroup: FC<{ className?: string, onConfirm: () => void, onCancel: () => void }> = ({
  className,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation()

  return (
    <div className={cn(className, "flex mt-3 space-x-2 mobile:ml-0 tablet:ml-[128px] text-sm")}>
      <Button
        className="text-sm"
        type="primary"
        onClick={onConfirm}
      >
        {t('common.operation.save')}
      </Button>
      <Button
        className="text-sm bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700"
        onClick={onCancel}
      >
        {t('common.operation.cancel')}
      </Button>
    </div>
  )
}

export default React.memo(TemplateVarPanel)
