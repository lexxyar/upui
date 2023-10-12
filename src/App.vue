<script setup lang="ts">
import {
  Button, Header, Badge, Card, Checkbox, DatePicker,
  DropdownMenu, DropdownItem, DropdownSeparator, Toast,
  InputText, Progress, Select, Switch, TextArea, Table,
  LaunchTile, MenuButton
} from '@lexxsoft/upui'
import {ref} from "vue";
import Pagination from "./components/Pagination.vue";

const btnStyles = ['primary', 'secondary', 'danger', 'warning', 'success', 'info']
const btnShapes = ['solid', 'outline', 'pill', 'free']
const checkboxValue = ref(true)
const errorText = 'Some error text'
const currentDate = ref(new Date())
const showDdMenu = ref(false)
const showDdMenuTl = ref(false)
const showDdMenuTR = ref(false)
const switchValue = ref(false)
const inputText = ref('Text')
const selectList = [
  {id: '1', value: 'Laravel'},
  {id: '2', value: 'VueJS'},
  {id: '3', value: 'React'},
  {id: '4', value: 'Wordpress'},
]
const selectedValue = ref('2')

const tableHeader = [
  {key: 'id'},
  {key: 'name'},
  {key: 'email'},
  {key: 'age'},
]
const tableData = ref([
  {id: '1', name: 'John Doe', email: 'jdoe@mail.com', age: 32},
  {id: '2', name: 'Jane Doe', email: 'janedoe@mail.com', age: 27},
  {id: '3', name: 'Adam Smith', email: 'smith_a@mail.com', age: 44},
  {id: '4', name: 'Bob Daniels', email: 'daniels@mail.com', age: 34},
])
const textareaValue = ref('Text area value')
</script>

<template>
  <div class="min-h-screen max-w-full">
    <aside class="left-panel w-80 fixed left-0 top-0 h-screen">
      <MenuButton label="Badges" href="#badges"></MenuButton>
      <MenuButton label="Buttons" href="#buttons"></MenuButton>
      <MenuButton label="Cards" href="#cards"></MenuButton>
      <MenuButton label="Form" href="#form">
        <MenuButton label="Checkbox" href="#checkbox"></MenuButton>
        <MenuButton label="Datepicker" href="#datepicker"></MenuButton>
        <MenuButton label="Input" href="#inputtext"></MenuButton>
        <MenuButton label="Select" href="#select"></MenuButton>
        <MenuButton label="Switch" href="#switch"></MenuButton>
        <MenuButton label="Textarea" href="#textarea"></MenuButton>
      </MenuButton>
      <MenuButton label="Dropdown menu" href="#dropdownmenu"></MenuButton>
      <MenuButton label="Header" href="#header"></MenuButton>
      <MenuButton label="Pagination" href="#pagination"></MenuButton>
      <MenuButton label="Progress" href="#progress"></MenuButton>
      <MenuButton label="Table" href="#table"></MenuButton>
      <MenuButton label="Tile" href="#tile"></MenuButton>
      <MenuButton label="Toast" href="#toast"></MenuButton>
    </aside>
    <div class="main-content ml-80 p-6">

      <section id="badges">
        <Header size="1">Bagdes</Header>
        <div class="mt-3">
          <Header size="5">:styl</Header>
          <div class="flex gap-4">
            <Badge v-for="styl in btnStyles" :key="styl" :styl="styl">{{ styl }}</Badge>
          </div>
        </div>

        <div class="mt-3">
          <Header size="5">:shape</Header>
          <div class="flex gap-4">
            <Badge v-for="shape in btnShapes" :key="shape" :shape="shape">{{ shape }}</Badge>
          </div>
        </div>
      </section>

      <section id="buttons">
        <Header size="1">Buttons</Header>
        + :strongBorder
        'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info'
        <div class="mt-3">
          <Header size="5">:styl</Header>
          <div class="flex gap-4">
            <Button v-for="styl in btnStyles" :key="styl" :styl="styl">{{ styl }}</Button>
          </div>
        </div>

        <div class="mt-3">
          <Header size="5">:shape</Header>
          <div class="flex gap-4">
            <Button v-for="shape in btnShapes" :key="shape" :shape="shape">{{ shape }}</Button>
          </div>
        </div>

        <div class="mt-3">
          <Header size="5">:icon-only</Header>
          <div class="flex gap-6">
            <div class="flex gap-2 items-center">
              <span>:icon-only="<strong>false</strong>"</span>
              <Button :icon-only="false">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
                </svg>
                With text
              </Button>
            </div>
            <div class="flex gap-2 items-center">
              <span>:icon-only="<strong>true</strong>"</span>
              <Button :icon-only="true">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="cards">
        <Header size="1">Cards</Header>
        <div class="mt-3">
          <Header size="5">Slot "header"</Header>
          <div class="flex gap-4">
            <Card size="lg">
              <template #header>This is "header" slot</template>
              Card content
            </Card>
          </div>
        </div>
        <div class="mt-3">
          <Header size="5">Sizes</Header>
          'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
          <div class="flex gap-4 mt-3">
            <Card size="full">
              size="<strong>full</strong>"
            </Card>
          </div>

          <div class="flex gap-4 mt-3">
            <Card size="xl">
              size="<strong>xl</strong>"
            </Card>
            <Card size="xl">
              size="<strong>xl</strong>"
            </Card>
          </div>

          <div class="flex gap-4 mt-3">
            <Card size="lg">
              size="<strong>lg</strong>"
            </Card>
            <Card size="lg">
              size="<strong>lg</strong>"
            </Card>
            <Card size="lg">
              size="<strong>lg</strong>"
            </Card>
          </div>

          <div class="flex gap-4 mt-3">
            <Card size="md">
              size="<strong>md</strong>"
            </Card>
            <Card size="md">
              size="<strong>md</strong>"
            </Card>
            <Card size="md">
              size="<strong>md</strong>"
            </Card>
            <Card size="md">
              size="<strong>md</strong>"
            </Card>
          </div>

          <div class="flex gap-4 mt-3">
            <Card size="sm">
              size="<strong>sm</strong>"
            </Card>
            <Card size="sm">
              size="<strong>sm</strong>"
            </Card>
            <Card size="sm">
              size="<strong>sm</strong>"
            </Card>
            <Card size="sm">
              size="<strong>sm</strong>"
            </Card>
            <Card size="sm">
              size="<strong>sm</strong>"
            </Card>
          </div>

          <div class="flex gap-4 mt-3">
            <Card size="xs">
              size="<strong>xs</strong>"
            </Card>
            <Card size="xs">
              size="<strong>xs</strong>"
            </Card>
            <Card size="xs">
              size="<strong>xs</strong>"
            </Card>
            <Card size="xs">
              size="<strong>xs</strong>"
            </Card>
            <Card size="xs">
              size="<strong>xs</strong>"
            </Card>
            <Card size="xs">
              size="<strong>xs</strong>"
            </Card>
          </div>

        </div>

      </section>

      <section id="form">
        <Header size="1">Form</Header>

        <!-- Checkbox -->
        <div class="mt-3" id="checkbox">
          <Header size="3">Checkbox</Header>
          <div class="mt-3">
            <Header size="5">Normal</Header>
            <div class="flex gap-4">
              <Checkbox v-model="checkboxValue">Checkbox label</Checkbox>
            </div>
          </div>

          <div class="mt-3">
            <Header size="5">:disabled</Header>
            <div class="flex gap-4">
              <Checkbox v-model="checkboxValue" :disabled="true">Disabled Checkbox</Checkbox>
            </div>
          </div>

          <div class="mt-3">
            <Header size="5">:errors</Header>
            <div class="flex gap-4">
              <Checkbox v-model="checkboxValue" :errors="errorText">Checkbox with errors</Checkbox>
            </div>
          </div>

        </div>

        <!-- DatePicker -->
        <div class="mt-3" id="datepicker">
          <Header size="3">DatePicker</Header>
          <div class="mt-3">
            <Header size="5">Normal</Header>
            <div class="flex gap-4">
              <DatePicker v-model="currentDate"/>
            </div>
          </div>

          <div class="mt-3">
            <Header size="5">:label</Header>
            <div class="flex gap-4">
              <DatePicker v-model="currentDate"
                          label="DatePicker label"
              />
            </div>
          </div>

          <div class="mt-3">
            <Header size="5">:size</Header>
            <div class="flex gap-4">
              <DatePicker v-model="currentDate"
                          label="DatePicker sm"
                          size="sm"
              />
              <DatePicker v-model="currentDate"
                          label="DatePicker md (normal)"
                          size="md"
              />
              <DatePicker v-model="currentDate"
                          label="DatePicker lg"
                          size="lg"
              />
            </div>
          </div>

          <div class="mt-3">
            <Header size="5">:errors</Header>
            <div class="flex gap-4">
              <DatePicker v-model="currentDate"
                          label="DatePicker with errors"
                          :errors="errorText"
              />
            </div>
          </div>

          <div class="mt-3">
            <Header size="5">:anchor</Header>
            <div class="flex gap-4">
              <DatePicker v-model="currentDate"
                          label="DatePicker anchored tl"
                          anchor="tl"
              />
              <DatePicker v-model="currentDate"
                          label="DatePicker anchored tr"
                          anchor="tr"
              />
            </div>
          </div>

          <div class="mt-3">
            <Header size="5">:clearable="true"</Header>
            <div class="flex gap-4">
              <DatePicker v-model="currentDate"
                          label="DatePicker with clear button"
                          :clearable="true"
              />
            </div>
          </div>

          <div class="mt-3">
            <Header size="5">Other options</Header>
            <div class="flex gap-4">
              <span>:required</span>
              <span>:placeholder</span>
              <span>:disabled</span>
              <span>:locale</span>
            </div>
          </div>

        </div>

        <!-- InputText -->
        <div class="mt-3" id="inputtext">
          <Header size="3">InputText</Header>
          <div class="mt-3">
            <Header size="5">Normal</Header>
            <div class="flex gap-4">
              <InputText v-model="inputText"/>
            </div>
          </div>

          <div class="mt-3">
            <Header size="5">:label</Header>
            <div class="flex gap-4">
              <InputText v-model="inputText"
                         label="InputText label"
              />
            </div>
          </div>

          <div class="mt-3">
            <Header size="5">:size</Header>
            <div class="flex gap-4">
              <InputText v-model="inputText"
                         label="InputText sm"
                         size="sm"
              />
              <InputText v-model="inputText"
                         label="InputText md (normal)"
                         size="md"
              />
              <InputText v-model="inputText"
                         label="InputText lg"
                         size="lg"
              />
            </div>
          </div>

          <div class="mt-3">
            <Header size="5">:errors</Header>
            <div class="flex gap-4">
              <InputText v-model="inputText"
                         label="InputText with errors"
                         :errors="errorText"
              />
            </div>
          </div>

          <div class="mt-3">
            <Header size="5">:clearable="true"</Header>
            <div class="flex gap-4">
              <InputText v-model="inputText"
                         label="InputText with clear button"
                         :clearable="true"
              />
            </div>
          </div>

          <div class="mt-3">
            <Header size="5">:selfFormed="true"</Header>
            <div class="flex gap-4">
              <InputText v-model="inputText"
                         label="InputText with clear button"
                         :selfFormed="true"
              />
            </div>
          </div>

          <div class="mt-3">
            <Header size="5">Other options</Header>
            <div class="flex gap-4">
              <span>:required</span>
              <span>:placeholder</span>
              <span>:disabled</span>
              <span>:type ['text' | 'email' | 'password']</span>
            </div>
          </div>

        </div>

        <!-- Select -->
        <div class="mt-3" id="select">
          <Header size="3">Select</Header>
          <div class="mt-3">
            <Header size="5">Normal</Header>
            <div class="flex gap-4">
              <Select v-model="selectedValue" :data="selectList"/>
            </div>
          </div>

          <div class="mt-3">
            <Header size="5">:label</Header>
            <div class="flex gap-4">
              <Select v-model="selectedValue" :data="selectList"
                      label="Select label"
              />
            </div>
          </div>

          <div class="mt-3">
            <Header size="5">:size</Header>
            <div class="flex gap-4">
              <Select v-model="selectedValue" :data="selectList"
                      label="Select sm"
                      size="sm"
              />
              <Select v-model="selectedValue" :data="selectList"
                      label="Select md (normal)"
                      size="md"
              />
              <Select v-model="selectedValue" :data="selectList"
                      label="Select lg"
                      size="lg"
              />
            </div>
          </div>

          <div class="mt-3">
            <Header size="5">:errors</Header>
            <div class="flex gap-4">
              <Select v-model="selectedValue" :data="selectList"
                      label="Select with errors"
                      :errors="errorText"
              />
            </div>
          </div>

          <div class="mt-3">
            <Header size="5">Other options</Header>
            <div class="flex gap-4">
              <span>:keyField</span>
              <span>:valueField</span>
              <span>:disabled</span>
            </div>
          </div>

        </div>

        <!-- Switch -->
        <div class="mt-3" id="switch">
          <Header size="3">Switch</Header>
          <div class="mt-3">
            <Header size="5">Normal</Header>
            <div class="flex gap-4">
              <Switch v-model="switchValue">Switch label</Switch>
            </div>
          </div>

          <div class="mt-3">
            <Header size="5">:label</Header>
            <div class="flex gap-4">
              <Switch v-model="switchValue" label="Switch label"/>
            </div>
          </div>

          <div class="mt-3">
            <Header size="5">:disabled</Header>
            <div class="flex gap-4">
              <Switch v-model="switchValue" :disabled="true" label="Disabled Switch"/>
            </div>
          </div>

          <div class="mt-3">
            <Header size="5">:errors</Header>
            <div class="flex gap-4">
              <Switch v-model="switchValue" :errors="errorText" label="Switch with errors"/>
            </div>
          </div>

          <div class="mt-3">
            <Header size="5">:size</Header>
            'lg' | 'sm' | 'md'
            <div class="flex gap-4 items-center">
              <Switch v-model="switchValue" size="sm" label="Switch size sm"/>
              <Switch v-model="switchValue" size="md" label="Switch size md"/>
              <Switch v-model="switchValue" size="lg" label="Switch size lg"/>
            </div>
          </div>

        </div>

        <!-- TextArea -->
        <div class="mt-3" id="textarea">
          <Header size="3">TextArea</Header>
          <div class="mt-3">
            <Header size="5">Normal</Header>
            <div class="flex gap-4">
              <TextArea v-model="textareaValue"/>
            </div>
          </div>

          <div class="mt-3">
            <Header size="5">:label</Header>
            <div class="flex gap-4">
              <TextArea v-model="textareaValue"
                        label="TextArea label"
              />
            </div>
          </div>

          <div class="mt-3">
            <Header size="5">:errors</Header>
            <div class="flex gap-4">
              <TextArea v-model="textareaValue"
                        label="TextArea with errors"
                        :errors="errorText"
              />
            </div>
          </div>

          <div class="mt-3">
            <Header size="5">:rows</Header>
            <div class="flex gap-4">
              <TextArea v-model="textareaValue"
                        label="TextArea with 1 row"
                        :rows="1"
              />
              <TextArea v-model="textareaValue"
                        label="TextArea with 3 rows"
                        :rows="3"
              />
              <TextArea v-model="textareaValue"
                        label="TextArea with 6 rows"
                        :rows="6"
              />
            </div>
          </div>

          <div class="mt-3">
            <Header size="5">Other options</Header>
            <div class="flex gap-4">
              <span>:required</span>
              <span>:placeholder</span>
              <span>:disabled</span>
            </div>
          </div>

        </div>

      </section>

      <section id="dropdownmenu">
        <Header size="1">Dropdown Menu</Header>
        <div class="mt-3">
          <Header size="5">v-model (show/hide)</Header>
          <div class="flex gap-4">
            <div class="relative">
              <Checkbox v-model="showDdMenu">Show/Hide dropdown menu</Checkbox>
              <DropdownMenu v-model="showDdMenu">
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem>Bills</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownSeparator/>
                <DropdownItem>Sign Out</DropdownItem>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div class="mt-3">
          <Header size="5">:anchor</Header>
          <div class="flex gap-4">
            <div class="relative">
              <Button @click="showDdMenuTl = !showDdMenuTl">:anchor="<strong>tl</strong>"</Button>
              <DropdownMenu v-model="showDdMenuTl" anchor="tl">
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem>Bills</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownSeparator/>
                <DropdownItem>Sign Out</DropdownItem>
              </DropdownMenu>
            </div>
            <div class="relative">
              <Button @click="showDdMenuTR = !showDdMenuTR">:anchor="<strong>tr</strong>"</Button>
              <DropdownMenu v-model="showDdMenuTR" anchor="tr">
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem>Bills</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownSeparator/>
                <DropdownItem>Sign Out</DropdownItem>
              </DropdownMenu>
            </div>
          </div>
        </div>

      </section>

      <section id="header">
        <Header size="1">Header</Header>
        <div class="mt-3">
          <Header size="5">:size</Header>
          '1' | '2' | '3' | '4' | '5' | '6'
          <div class="flex gap-4">
            <Header v-for="i in 5" :key="i" :size="i.toString()">Header {{ i }}</Header>
          </div>
        </div>
      </section>

      <section id="pagination">
        <Header size="1">Pagination</Header>

        <div class="mt-3">
          <Header size="5"></Header>
          <div class="w-full">
            <Pagination total="1000" current-page="1"/>
          </div>
        </div>

      </section>

      <section id="progress">
        <Header size="1">Progress</Header>
        <div class="mt-3">
          <Header size="5">:size</Header>
          'lg' | 'md' | 'sm' | 'xl'
          <div class="flex gap-4">
            <div class="w-1/4">
              <span>:size="<strong>sm</strong>"</span>
              <Progress :current="50" size="sm"/>
            </div>
            <div class="w-1/4">
              <span>:size="<strong>md</strong>"</span>
              <Progress :current="50" size="md"/>
            </div>
            <div class="w-1/4">
              <span>:size="<strong>lg</strong>"</span>
              <Progress :current="50" size="lg"/>
            </div>
            <div class="w-1/4">
              <span>:size="<strong>xl</strong>"</span>
              <Progress :current="50" size="xl"/>
            </div>

          </div>
        </div>

        <div class="mt-3">
          <Header size="5">:styl</Header>
          'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
          <div class="flex gap-4">
            <div class="w-1/6" v-for="styl in btnStyles" :key="styl">
              <span>:styl="<strong>{{ styl }}</strong>"</span>
              <Progress :current="50" :styl="styl"/>
            </div>
          </div>
        </div>
      </section>

      <section id="table">
        <Header size="1">Table</Header>
        <div class="mt-3">
          <Header size="5">Normal</Header>
          <div class="flex gap-4">
            <Table :header="tableHeader"
                   :data="tableData"
            />
          </div>
        </div>

        <div class="mt-3">
          <Header size="5">:checkboxes="<strong>false</strong>"</Header>
          <div class="flex gap-4">
            <Table :header="tableHeader"
                   :data="tableData"
                   :checkboxes="false"
            />
          </div>
        </div>

        <div class="mt-3">
          <Header size="5">Other options</Header>
          <div class="flex gap-4">
            <span>:sortedKey</span>
            <span>:valueField</span>
            <span>:disabled</span>
          </div>
        </div>

      </section>

      <section id="tile">
        <Header size="1">LaunchTile</Header>

        <div class="mt-3">
          <Header size="5">Fulfilled (with default slot)</Header>
          <div class="flex gap-4">
            <LaunchTile title="Fulfilled tile with content"
                        subtitle="Has footer"
                        footer="Revenue, RUB">
              <div class="flex flex-row w-full gap-4 items-center h-full">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor"
                       class="w-10 h-10">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"/>
                  </svg>
                </div>
                <div class="flex-grow">
                  This is tile content
                </div>
              </div>

            </LaunchTile>
          </div>
        </div>

        <div class="mt-3">
          <Header size="5">:title, :subtitle, :footer</Header>
          <div class="flex gap-4">
            <LaunchTile title="Tile title"/>
            <LaunchTile subtitle="Tile subtitle"/>
            <LaunchTile footer="Tile footer"/>
          </div>
        </div>

      </section>

      <section id="toast">
        <Header size="1">Toast</Header>

        <div class="mt-3">
          <Header size="5">:styl</Header>
          'error' | 'success' | 'warning' | 'info' | 'danger'
          <div class="flex gap-4">
            <template v-for="styl in btnStyles" :key="styl">
              <template v-if="!['primary','secondary'].includes(styl)">
                <Toast :message="`${styl} message`" :styl="styl"/>
              </template>
            </template>
          </div>
        </div>

        <div class="mt-3">
          <Header size="5">Other options</Header>
          <div class="flex gap-4">
            <span>:duration</span>
            <span>:message</span>
          </div>
        </div>

      </section>


    </div>
  </div>

</template>
