/**
 * WordPress dependencies
 */
import { __experimentalItemGroup as ItemGroup } from '@wordpress/components';
import { typography, color, layout } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { NavigationButtonAsItem } from './navigation-button';
import { unlock } from '../../private-apis';

const {
	useHasDimensionsPanel,
	useHasTypographyPanel,
	useHasColorPanel,
	useGlobalSetting,
	useSettingsForBlockElement,
} = unlock( blockEditorPrivateApis );

function RootMenu() {
	const [ rawSettings ] = useGlobalSetting( '' );
	const settings = useSettingsForBlockElement( rawSettings );
	const hasTypographyPanel = useHasTypographyPanel( settings );
	const hasColorPanel = useHasColorPanel( settings );
	const hasDimensionsPanel = useHasDimensionsPanel( settings );
	const hasLayoutPanel = hasDimensionsPanel;

	return (
		<>
			<ItemGroup>
				{ hasTypographyPanel && (
					<NavigationButtonAsItem
						icon={ typography }
						path="/typography"
						aria-label={ __( 'Typography styles' ) }
					>
						{ __( 'Typography' ) }
					</NavigationButtonAsItem>
				) }
				{ hasColorPanel && (
					<NavigationButtonAsItem
						icon={ color }
						path="/colors"
						aria-label={ __( 'Colors styles' ) }
					>
						{ __( 'Colors' ) }
					</NavigationButtonAsItem>
				) }
				{ hasLayoutPanel && (
					<NavigationButtonAsItem
						icon={ layout }
						path="/layout"
						aria-label={ __( 'Layout styles' ) }
					>
						{ __( 'Layout' ) }
					</NavigationButtonAsItem>
				) }
			</ItemGroup>
		</>
	);
}

export default RootMenu;
