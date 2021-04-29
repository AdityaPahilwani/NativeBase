import React from 'react';
import { Pressable } from 'react-native';
import Box from '../../primitives/Box';
import { ModalContext } from './Context';
import { useThemeProps } from '../../../hooks';

const ModalOverlay = ({ children, ...props }: any, ref?: any) => {
  const newProps = useThemeProps('ModalOverlay', props);
  const { toggleVisible, toggleOnClose } = React.useContext(ModalContext);

  return (
    <Box {...newProps} ref={ref}>
      <Pressable
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        }}
        accessible={false}
        focusable={false}
        // Using the below combination makes it work like a native popup menu on Android
        importantForAccessibility="no"
        onAccessibilityTap={() => {
          toggleVisible(false);
          toggleOnClose(false);
        }}
        onPress={
          newProps.closeOnOverlayClick === false
            ? () => {}
            : () => {
                toggleVisible(false);
                toggleOnClose(false);
              }
        }
      />
      {children}
    </Box>
  );
};

export default React.memo(React.forwardRef(ModalOverlay));