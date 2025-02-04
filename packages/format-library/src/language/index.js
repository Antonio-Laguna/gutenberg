/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * WordPress dependencies
 */
import { RichTextToolbarButton } from '@wordpress/block-editor';
import {
	TextControl,
	SelectControl,
	Button,
	Popover,
	__experimentalHStack as HStack,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { applyFormat, removeFormat, useAnchor } from '@wordpress/rich-text';
import { language as languageIcon } from '@wordpress/icons';

const name = 'core/language';
const title = __( 'Language' );

export const language = {
	name,
	tagName: 'span',
	className: 'has-language',
	edit: Edit,
	title,
};

function Edit( props ) {
	const { contentRef, isActive, onChange, value } = props;
	const popoverAnchor = useAnchor( {
		editableContentElement: contentRef.current,
		settings: language,
	} );

	const [ lang, setLang ] = useState( '' );
	const [ dir, setDir ] = useState( 'ltr' );

	const [ isPopoverVisible, setIsPopoverVisible ] = useState( false );
	const togglePopover = () => {
		setIsPopoverVisible( ( state ) => ! state );
		setLang( '' );
		setDir( 'ltr' );
	};

	return (
		<>
			<RichTextToolbarButton
				icon={ languageIcon }
				label={ title }
				title={ title }
				onClick={ () => {
					if ( isActive ) {
						onChange( removeFormat( value, name ) );
					} else {
						togglePopover();
					}
				} }
				isActive={ isActive }
				role="menuitemcheckbox"
			/>

			{ isPopoverVisible && (
				<Popover
					className="block-editor-format-toolbar__language-popover"
					anchor={ popoverAnchor }
					placement="bottom"
					onClose={ togglePopover }
				>
					<form
						className="block-editor-format-toolbar__language-container-content"
						onSubmit={ ( event ) => {
							onChange(
								applyFormat( value, {
									type: name,
									attributes: {
										lang,
										dir,
									},
								} )
							);
							togglePopover();
							event.preventDefault();
						} }
					>
						<TextControl
							label={ title }
							value={ lang }
							onChange={ ( val ) => setLang( val ) }
							help={ __(
								'A valid language attribute, like "en" or "fr".'
							) }
						/>
						<SelectControl
							label={ __( 'Text direction' ) }
							value={ dir }
							options={ [
								{
									label: __( 'Left to right' ),
									value: 'ltr',
								},
								{
									label: __( 'Right to left' ),
									value: 'rtl',
								},
							] }
							onChange={ ( val ) => setDir( val ) }
						/>
						<HStack alignment="right">
							<Button
								variant="primary"
								type="submit"
								text={ __( 'Apply' ) }
							/>
						</HStack>
					</form>
				</Popover>
			) }
		</>
	);
}
