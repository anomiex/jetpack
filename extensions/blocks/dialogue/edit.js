/**
 * External dependencies
 */
import { find } from 'lodash';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	RichText,
	BlockControls,
} from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

import {
	Panel,
	PanelBody,
	ToggleControl,
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';
import { useContext, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './editor.scss';
import ParticipantsDropdown, {
	ParticipantsControl,
	ParticipantControl,
} from './components/participants-control';
import TimeStampControl, { TimeStampDropdown } from './components/time-stamp-control';
import ConversationContext from '../conversation/components/context';
import { defaultParticipants, defaultParticipantSlug } from '../conversation/edit';
import { formatUppercase, controlForwardFive, controlBackFive } from '../../shared/icons';

function getParticipantBySlug( participants, slug ) {
	const participant = find( participants, ( contextParticipant ) => contextParticipant.participantSlug === slug );
	if ( participant ) {
		return participant;
	}

	// Fallback participant. First one in the list.
	return participants?.[ 0 ];
}

const blockName = 'jetpack/dialogue';
const blockNameFallback = 'core/paragraph';

export default function DialogueEdit ( {
	className,
	attributes,
	setAttributes,
	instanceId,
	context,
	onReplace,
	mergeBlocks,
} ) {
	const {
		participant,
		participantSlug,
		timeStamp,
		showTimeStamp: showTimeStampLocally,
		content,
		placeholder,
	} = attributes;
	const [ isFocusedOnParticipantLabel, setIsFocusedOnParticipantLabel ] = useState( false );

	// Block context integration.
	const participantsFromContext = context[ 'jetpack/conversation-participants' ];
	const showTimeStampGlobally = context[ 'jetpack/conversation-showtimestamp' ];


	// Participants list.
	const participants = participantsFromContext?.length ? participantsFromContext : defaultParticipants;

	// Transcription context. A bridge between dialogue and transcription blocks.
	const transcritionBridge = useContext( ConversationContext );

	const isCustomParticipant = !! participant && ! participantSlug;
	const currentParticipantSlug = isCustomParticipant ? defaultParticipantSlug : participantSlug;
	const currentParticipant = getParticipantBySlug( participants, currentParticipantSlug );
	const participantLabel = isCustomParticipant ? participant : currentParticipant?.participant;

	const showTimeStamp = isCustomParticipant ? showTimeStampLocally : showTimeStampGlobally;

	const baseClassName = 'wp-block-jetpack-dialogue';

	/**
	 * Helper to check if the gven style is set, or not.
	 * It handles local and global (conversation) level.
	 *
	 * @param {string} style - style to check.
	 * @returns {boolean} True if the style is defined. Otherwise, False.
	 */
	function hasStyle( style ) {
		if ( isCustomParticipant || ! participantsFromContext ) {
			return attributes?.[ style ];
		}

		return currentParticipant?.[ style ];
	}

	/**
	 * Helper to toggle the value of the given style
	 * It handles local and global (conversation) level.
	 *
	 * @param {string} style - style to toggle.
	 * @returns {void}
	 */
	function toggleParticipantStyle( style ) {
		if ( isCustomParticipant || ! participantsFromContext ) {
			return setAttributes( { [ style ]: ! attributes[ style ] } );
		}

		transcritionBridge.updateParticipants( {
			participantSlug: currentParticipantSlug,
			[ style ]: ! currentParticipant[ style ],
		} );
	}

	/**
	 * Helper to build the CSS classes for the participant label.
	 * It handles local and global (conversation) level.
	 *
	 * @returns {string} Participant CSS class.
	 */
	function getParticipantLabelClass() {
		if ( isCustomParticipant || ! participantsFromContext ) {
			return classnames( `${ baseClassName }__participant`, {
				[ 'has-bold-style' ]: attributes?.hasBoldStyle,
				[ 'has-italic-style' ]: attributes?.hasItalicStyle,
				[ 'has-uppercase-style' ]: attributes?.hasUppercaseStyle,
			} );
		}

		return classnames( `${ baseClassName }__participant`, {
			[ 'has-bold-style' ]: currentParticipant?.hasBoldStyle,
			[ 'has-italic-style' ]: currentParticipant?.hasItalicStyle,
			[ 'has-uppercase-style' ]: currentParticipant?.hasUppercaseStyle,
		} );
	}

	function setShowTimeStamp( value ) {
		if ( isCustomParticipant || ! participantsFromContext ) {
			return setAttributes( { showTimeStamp: value } );
		}

		transcritionBridge.setAttributes( { showTimeStamp: value } );
	}

	return (
		<div className={ className }>
			<BlockControls>
				{ transcritionBridge?.getMediaAudio() && (
					<ToolbarGroup>
						<ToolbarButton
							icon={ controlBackFive }
							onClick={ () => {
								const mediaAudio = transcritionBridge?.getMediaAudio();
								const forward = mediaAudio.currentTime - 5;
								setAttributes( { timeStamp: transcritionBridge.secondsToTimeCode( forward ) } );
								mediaAudio.currentTime = forward;
							} }
						/>

						<ToolbarButton
							icon={ transcritionBridge.player.isPlaying
								? "controls-pause"
								: "controls-play"
							}
							onClick={ () => {
								const mediaAudio = transcritionBridge?.getMediaAudio();
								if ( transcritionBridge.player.isPlaying ) {
									return mediaAudio.pause();
								}

								mediaAudio.currentTime = transcritionBridge.timeCodeToSeconds( timeStamp );
								mediaAudio.play();
							} }
						/>
						<ToolbarButton
							icon={ controlForwardFive }
							onClick={ () => {
								const mediaAudio = transcritionBridge?.getMediaAudio();
								const forward = mediaAudio.currentTime + 5;
								setAttributes( { timeStamp: transcritionBridge.secondsToTimeCode( forward ) } );
								mediaAudio.currentTime = forward;
							} }
						/>
					</ToolbarGroup>
				) }

				{ currentParticipant && isFocusedOnParticipantLabel && (
					<ToolbarGroup>
						<ToolbarButton
							icon="editor-bold"
							isPressed={ hasStyle( 'hasBoldStyle' ) }
							onClick={ () => toggleParticipantStyle( 'hasBoldStyle' ) }
						/>

						<ToolbarButton
							icon="editor-italic"
							isPressed={ hasStyle( 'hasItalicStyle' ) }
							onClick={ () => toggleParticipantStyle( 'hasItalicStyle' ) }
						/>

						<ToolbarButton
							icon={ formatUppercase }
							isPressed={ hasStyle( 'hasUppercaseStyle' ) }
							onClick={ () => toggleParticipantStyle( 'hasUppercaseStyle' ) }
						/>
					</ToolbarGroup>
				) }
			</BlockControls>

			<InspectorControls>
				<Panel>
					<PanelBody title={ __( 'Participant', 'jetpack' ) }>
						<ParticipantsControl
							className={ baseClassName }
							participants={ participants }
							participantSlug={ participantSlug || '' }
							onSelect={ setAttributes }
						/>
						<ParticipantControl
							className={ className }
							participantValue={ participant }
							onChange={ setAttributes }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Time stamp', 'jetpack' ) }>
						<ToggleControl
							label={ __( 'Show', 'jetpack' ) }
							checked={ showTimeStamp }
							onChange={ setShowTimeStamp }
						/>

						{ showTimeStamp && (
							<TimeStampControl
								className={ baseClassName }
								value={ timeStamp }
								onChange={ ( newTimeStampValue ) => {
									setAttributes( { timeStamp: newTimeStampValue } );
								} }
							/>
						) }
					</PanelBody>
				</Panel>
			</InspectorControls>

			<div className={ `${ baseClassName }__meta` }>
				<div onFocus={ () => setIsFocusedOnParticipantLabel( true ) }>
					<ParticipantsDropdown
						id={ `dialogue-${ instanceId }-participants-dropdown` }
						className={ baseClassName }
						labelClassName={ getParticipantLabelClass() }
						participants={ participants }
						participantLabel={ participantLabel }
						participantSlug={ participantSlug }
						participant={ participant }
						onSelect={ setAttributes }
						onChange={ setAttributes }
					/>
				</div>

				{ showTimeStamp && (
					<TimeStampDropdown
						className={ baseClassName }
						value={ timeStamp }
						onChange={ ( newTimeStampValue ) => {
							setAttributes( { timeStamp: newTimeStampValue } );
						} }
						shortLabel={ true }
					/>
				) }
			</div>

			<RichText
				identifier="content"
				wrapperClassName={ `${ baseClassName }__content` }
				value={ content }
				onChange={ ( value ) =>
					setAttributes( { content: value } )
				}
				onMerge={ mergeBlocks }
				onSplit={ ( value ) => {
					if ( ! content?.length ) {
						return createBlock( blockNameFallback );
					}

					if ( ! value ) {
						return createBlock( blockName );
					}

					return createBlock( blockName, {
						...attributes,
						content: value,
					} );
				} }
				onReplace={ onReplace }
				onRemove={
					onReplace ? () => onReplace( [] ) : undefined
				}
				placeholder={ placeholder || __( 'Write dialogue…', 'jetpack' ) }
				keepPlaceholderOnFocus={ true }
				isSelected={ ! isFocusedOnParticipantLabel }
				onFocus={ () => setIsFocusedOnParticipantLabel( false ) }
			/>
		</div>
	);
}
