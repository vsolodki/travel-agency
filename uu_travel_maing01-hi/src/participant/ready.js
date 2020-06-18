//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";

import Config from "./config/config.js";
import TileList from "../bricks/tile-list.js";
import Tile from "./tile.js";
import CreateForm from "./create-form.js";
import UpdateForm from "./update-form.js";
import Delete from "./delete.js";
import Detail from "./detail";
import Filter from "./filter.js";
import FormModal from "../bricks/form-modal.js";

import "./ready.less";
import LSI from "./ready-lsi.js";
import { removeRouteParameters, setRouteParameters } from "../helpers/history-helper";
//@@viewOff:imports

export const Ready = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Ready",
    classNames: {
      main: Config.CSS + "ready"
    },
    lsi: LSI
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    detailId: UU5.PropTypes.string,
    onCreate: UU5.PropTypes.func.isRequired,
    onUpdate: UU5.PropTypes.func.isRequired,
    onDelete: UU5.PropTypes.func.isRequired
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding
  componentDidMount() {
    if (this.props.detailId) {
      let participant = this.props.data.find(item => item.id === this.props.detailId);
      participant && this._handleDetail(participant);
    }
  },
//@@viewOff:reactLifeCycle
  //@@viewOn:private
  _tileRenderer(tileProps) {
    const { data, ...props } = tileProps;
    if (data.inProgress) {
      props.disabled = true;
    }
    return <Tile {...props} data={tileProps.data} onDelete={this._handleDelete} onUpdate={this._handleUpdate} onDetail={this._handleDetail} />;
  },
  _handleDetail(record) {
    this._modal.open(
      {
        header: <span>{record.name}</span>,
        content: <Detail data={record} />,
        className: this.getClassName("detail"),
        onClose: this._handleDetailClose
      },
      () => this._handleDetailOpen(record)
    );
  },

  _handleDetailOpen(record) {
    setRouteParameters({ id: record.id });
  },

  _handleDetailClose(opt) {
    // remove id from location
    removeRouteParameters();
    opt.component.onCloseDefault(opt);
  },
  _registerModal(cmp) {
    this._modal = cmp;
  },

  _getActions() {
    return [
      {
        content: this.getLsi("create"),
        onClick: () => {
          this._modal.open({
            header: this.getLsiComponent("createHeader"),
            content: <CreateForm />,
            onSave: this.props.onCreate,
            controls: {
              buttonSubmitProps: {
                content: this.getLsiComponent("createButton")
              }
            }
          });
        },
        icon: "mdi-plus-circle",
        active: true
      }
    ];
  },

  _getSortItems() {
    return [
      {
        key: "name",
        name: { cs: "Název", en: "Name" }
      }
    ];
  },

  _handleUpdate(record) {
    this._modal.open({
      header: this.getLsiComponent("updateHeader"),
      content: <UpdateForm />,
      onSave: data => this.props.onUpdate({ id: record.id, ...data }),
      values: record,
      controls: {
        buttonSubmitProps: {
          content: this.getLsiComponent("updateButton")
        }
      }
    });
  },
  _getFilters() {
    let filters = [
      {
        key: "trip",
        label: this.getLsi("filterByTrip"),
        filterFn: (item, filterValue) => item.tripList && item.tripList.includes(filterValue)
      }

    ];
    return filters;
  },
  _handleDelete(record) {
    this._modal.open({
      header: this.getLsiComponent("deleteHeader"),
      content: <Delete data={record} />,
      onSave: data => this.props.onDelete({ ...record, ...data }),
      controls: {
        buttonSubmitProps: {
          content: this.getLsiComponent("deleteButton"),
          colorSchema: "danger"
        }
      }
    });
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <TileList
          tileRenderer={this._tileRenderer}
          data={this.props.data}
          title={this.getLsi("list")}
          actions={this._getActions}
          sortItems={this._getSortItems}
          tileHeight={100}
          >
          {/*<UU5.Tiles.FilterBar filters={this._getFilters}>
            <Filter />
          </UU5.Tiles.FilterBar>*/}
        </TileList>

        <FormModal ref_={this._registerModal} />
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default Ready;
