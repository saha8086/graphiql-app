import { ChangeEventHandler, ClipboardEventHandler, forwardRef, useCallback, useId } from 'react';
import { IconButton, Input, InputGroup, InputLeftAddon, InputRightElement } from '@chakra-ui/react';
import { VscCopy } from 'react-icons/vsc';

import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { selectApiList, selectBaseUrl, setURL } from './InputURL.slice';
import { ProtocolType, validateURL } from '@utils/url';
import { Datalist } from '@components/Datalist/Datalist';
import { useCurrentBreakpoint } from '@hooks/responsive';

const format = 'text/plain';

const protocol: ProtocolType = 'https:';

const onCopy: ClipboardEventHandler<HTMLInputElement> = (event) => {
  event.preventDefault();
  const url = validateURL(
    `${protocol}//${event.clipboardData.getData(format) || event.currentTarget.value}`,
    protocol
  );
  if (url) {
    event.clipboardData.setData(format, url);
  }
};

const onPaste: ClipboardEventHandler<HTMLInputElement> = (event) => {
  event.preventDefault();
  const url = validateURL(event.clipboardData.getData(format), protocol);
  if (url) {
    event.currentTarget.value = url.replace(`${protocol}//`, '');
  }
};

export const InputURL = forwardRef<HTMLInputElement>((_, ref) => {
  const dispatch = useAppDispatch();
  const apiList = useAppSelector(selectApiList);
  const url = useAppSelector(selectBaseUrl);
  const apiDatalistId = useId();
  const breakpoint = useCurrentBreakpoint();

  const onClick = useCallback(async () => {
    try {
      await window.navigator.clipboard.writeText(url);
    } catch (_) {
      // Available only in secure contexts.
    }
  }, [url]);

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const url = validateURL(`${protocol}//${event.target.value}`, protocol);
      if (url) {
        dispatch(setURL(url));
      }
    },
    [dispatch]
  );

  return (
    <InputGroup>
      <InputLeftAddon paddingInline={breakpoint === 'xl' ? '1rem' : '0.5rem'}>
        {`${protocol}//`}
      </InputLeftAddon>
      <Input
        ref={ref}
        onCopy={onCopy}
        onPaste={onPaste}
        onChange={onChange}
        list={apiDatalistId}
        type="url"
        aria-label="URL"
        defaultValue={url.replace(`${protocol}//`, '')}
      />
      <Datalist
        id={apiDatalistId}
        options={apiList.map((url) => url.replace(`${protocol}//`, ''))}
      />
      <InputRightElement>
        <IconButton aria-label="Copy" icon={<VscCopy />} onClick={onClick} />
      </InputRightElement>
    </InputGroup>
  );
});
